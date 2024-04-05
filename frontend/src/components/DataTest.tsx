import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DataTest() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [commands, setCommands] = useState([]);

  const deviceId = 'bff4c4030952063635z14i';
  const context = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: '8wjakagt7scm8kewe83c',
    secretKey: '6126ba95a7b24d33b95209063c802634',
  });

  useEffect(() => {
    const startDateInEpoch = startDate.getTime();
    const endDateInEpoch = endDate.getTime();

    const fetchData = async () => {
      try {
        console.log(startDateInEpoch);
        console.log(endDateInEpoch);
        const response = await context.request({
          path: `/v1.0/devices/${deviceId}/logs?start_time=${startDateInEpoch.toString()}&end_time=${endDateInEpoch.toString()}&type=7`,
          method: 'GET',
        });
        setCommands(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  console.log(commands);

  return (
    <div className='flex flex-col items-center justify-between gap-72 mt-10'>
      <DatePicker
        selected={startDate}
        showTimeSelect
        showIcon
        className='border border-black'
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        showTimeSelect
        showIcon
        className='border border-black'
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
}
