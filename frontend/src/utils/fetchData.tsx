import * as qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';

export async function fetchDataFromTuya(
  url: string,
  accessKey: string,
  secretKey: string,
  method: string,
) {
  let token = '';

  const config = {
    /* openapi host */
    host: 'https://openapi.tuyacn.com',
    accessKey,
    secretKey,
  };

  const httpClient = axios.create({
    baseURL: config.host,
    timeout: 5 * 1e3,
  });

  await getToken();

  async function getToken() {
    const timestamp = Date.now().toString();
    const signUrl = '/v1.0/token?grant_type=1';
    const contentHash = await sha256('');
    const stringToSign = [method, contentHash, '', signUrl].join('\n');
    const signStr = config.accessKey + timestamp + stringToSign;

    const headers = {
      t: timestamp,
      sign_method: 'HMAC-SHA256',
      client_id: config.accessKey,
      sign: await encryptStr(signStr, config.secretKey),
    };

    const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', { headers });
    if (!login || !login.success) {
      throw Error(`fetch failed: ${login.msg}`);
    }
    token = login.result.access_token;
  }

  async function sha256(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.prototype.map
      .call(new Uint8Array(hashBuffer), (x: any) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }

  async function encryptStr(str: string, secret: string): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const data = new TextEncoder().encode(str);
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return Array.prototype.map
      .call(new Uint8Array(signature), (x: any) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }

  async function getRequestSign(
    url: string,
    method: string,
  ): Promise<AxiosRequestConfig['headers']> {
    const t = Date.now().toString();
    const [uri, pathQuery] = url.split('?');
    const queryMerged = qs.parse(pathQuery);
    const sortedQuery: { [k: string]: string } = {};
    Object.keys(queryMerged)
      .sort()
      .forEach((i) => (sortedQuery[i] = queryMerged[i] as string));

    const querystring = decodeURIComponent(qs.stringify(sortedQuery));
    const finalUrl = querystring ? `${uri}?${querystring}` : uri;
    const contentHash = await sha256('');
    const stringToSign = [method, contentHash, '', finalUrl].join('\n');
    const signStr = config.accessKey + token + t + stringToSign;
    return {
      t,
      path: finalUrl,
      client_id: config.accessKey,
      sign: await encryptStr(signStr, config.secretKey),
      sign_method: 'HMAC-SHA256',
      access_token: token,
    };
  }

  const reqHeaders = await getRequestSign(url, method);

  const { data } = await httpClient.request({
    method,
    url: reqHeaders && reqHeaders.path,
    headers: reqHeaders,
  });

  if (!data || !data.success) {
    throw Error(`request api failed: ${data.msg}`);
  }

  return data;
}
