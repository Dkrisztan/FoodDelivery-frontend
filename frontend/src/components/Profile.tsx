import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import userIcon from '../assets/user.png';
import { FaSquarePlus } from 'react-icons/fa6';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import Icons from '@/utils/Icons.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { HexColorPicker } from 'react-colorful';
// @ts-expect-error
import MyTimeline from './MyTimeline';

//! Used for testing
// const plugArray = [
//   {
//     name: 'Kávéfőző',
//     color: '#87abe6',
//     icon: 'coffeeMaker',
//   },
//   {
//     name: 'Hűtő',
//     color: '#03fc94',
//     icon: 'refrigerator',
//   },
//   {
//     name: 'TV',
//     color: '#8557c9',
//     icon: 'television',
//   },
//   {
//     name: 'Hősugárzó',
//     color: '#f58f15',
//     icon: 'radiator',
//   },
//   {
//     name: 'Mosógép',
//     color: '#c7a5bf',
//     icon: 'laundryMachine',
//   },
//   {
//     name: 'Mikró',
//     color: '#d3276c',
//     icon: 'microwave',
//   },
// ];

// interface Plug {
//   id: string;
//   deviceId: string;
//   name: string;
//   iconName: string;
//   color: string;
// }

export function Profile() {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    plugs: [],
  });

  const [name, setName] = useState('Konnektor');
  const [deviceId, setDeviceId] = useState('');
  const [icon, setIcon] = useState('microwave');
  const [color, setColor] = useState('#AABBCC');

  async function handlePlugCreation() {
    const plugData = {
      name: name,
      deviceId: deviceId,
      iconName: icon,
      color: color,
      userId: profile.id,
    };
    try {
      const response = await axios.post('https://onlab-backend.vercel.app/plug', plugData, config);
      console.log(response);
      fetchProfile();
    } catch (e) {
      console.log(e);
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://onlab-backend.vercel.app/auth/profile', config);
      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className='w-full px-[200px] mx-auto mt-8'>
        <div className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='text-2xl mb-4 flex items-center'>
            <img src={userIcon} width='64px' height='64px' alt='user' />
            {profile && profile.name.toUpperCase()}
          </h1>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>ID:</label>
            <p>{profile.id}</p>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
            <p>{profile.email}</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type='button'
              className='w-full rounded-md pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 bg-[#259372] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#1e7e61] hover:shadow-primary-2'
            >
              <div className='flex flex-row items-center gap-2 text-xl'>
                Konnektor hozzáadása <FaSquarePlus className='w-5 h-5' />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className='w-1/5 bg-neutral-800 text-white border-none'>
            <DialogHeader>
              <DialogTitle className='text-center'>Konnektor hozzáadása</DialogTitle>
            </DialogHeader>
            <div className='flex flex-row py-2 justify-evenly'>
              <div className='flex flex-row items-center justify-between gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Név
                </Label>
                <Input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className='bg-neutral-800 text-white'
                />
              </div>
              <div>
                <Select onValueChange={(e) => setIcon(Object.keys(Icons)[+e].toString())}>
                  <SelectTrigger className='w-[40px] p-0 outline-none border-none focus:outline-none focus:shadow-none bg-neutral-800'>
                    <SelectValue
                      placeholder={
                        <img alt='icon' height='64' src={Icons['microwave']} width='64' />
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(Icons).map((value, index) => {
                        return (
                          <SelectItem value={index.toString()}>
                            <img alt='icon' height='64' width='64' src={Icons[value]} />
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-row py-2'>
              <div className='flex flex-row items-center gap-3'>
                <Label htmlFor='name' className='text-right'>
                  DeviceId
                </Label>
                <Input
                  type='text'
                  id='name'
                  value={deviceId}
                  onChange={(e) => {
                    setDeviceId(e.target.value);
                  }}
                  className='bg-neutral-800 text-white'
                />
              </div>
            </div>
            <HexColorPicker color={color} onChange={setColor} className='react-colorful' />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className='mx-auto bg-gray-200 text-black font-bold hover:bg-gray-300'
                  type='submit'
                  onClick={handlePlugCreation}
                >
                  Hozzáadás
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <MyTimeline plugs={profile.plugs} />

      {/* Mapping over the user's plug array */}
      {/*{plugArray.map((plug, index) => {*/}
      {/*  return <Plug name={plug.name} color={plug.color} icon={plug.icon} index={index} />;*/}
      {/*})}*/}
      {/*{profile.plugs.map((plug: Plug, index) => {*/}
      {/*  return (*/}
      {/*    <Plug*/}
      {/*      id={plug.id}*/}
      {/*      name={plug.name}*/}
      {/*      color={plug.color}*/}
      {/*      icon={plug.iconName}*/}
      {/*      index={index}*/}
      {/*      refetchData={fetchProfile}*/}
      {/*    />*/}
      {/*  );*/}
      {/*})}*/}
      {/*<TimeLine />*/}
    </>
  );
}
