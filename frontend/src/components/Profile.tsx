import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import userIcon from '../assets/user.png';
// @ts-expect-error
import MyTimeline from './MyTimeline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { FaEdit } from 'react-icons/fa';

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
  const [selectedPlug, setSelectedPlug] = useState(null);

  function handlePlugSelection(plug) {
    setSelectedPlug(
      profile.plugs.find((i) => {
        return i.id === plug;
      }),
    );
  }

  // Function to handle plug data changes
  function handleInputChange(event) {
    // Handle changes to plug data fields
  }

  // Function to handle saving changes
  function handleSaveChanges() {
    // Save changes to plug data
  }

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
    const intervalId = setInterval(() => {
      fetchProfile();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // @ts-ignore
  // @ts-ignore
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

        <h1 className='font-bold text-3xl pb-2'>Konnektor módosítása</h1>
        <Select onValueChange={handlePlugSelection}>
          <SelectTrigger className='w-full text-xl bg-[#259372] text-white'>
            <SelectValue
              placeholder={
                <div className='flex flex-row  justify-center items-center gap-2'>
                  <span className='bg-[#259372] text-white'>Válassz ki egy konnektort!</span>{' '}
                  <FaEdit className='w-5 h-5' />
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            {profile.plugs.map((plug) => (
              <SelectItem key={plug.id} value={plug.id}>
                {plug.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedPlug && (
          <div className='bg-yellow-500 p-4 mt-5 border rounded-md'>
            <form onSubmit={handleSaveChanges}>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' value={selectedPlug.name} onChange={handleInputChange} />
              <button type='submit'>Save Changes</button>
            </form>
          </div>
        )}

        {/*<Dialog>*/}
        {/*  <DialogTrigger asChild>*/}
        {/*    <button*/}
        {/*      type='button'*/}
        {/*      className='w-full rounded-md pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 bg-[#259372] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#1e7e61] hover:shadow-primary-2'*/}
        {/*    >*/}
        {/*      <div className='flex flex-row items-center gap-2 text-xl'>*/}
        {/*        Konnektor módosítása <FaEdit className='w-5 h-5' />*/}
        {/*      </div>*/}
        {/*    </button>*/}
        {/*  </DialogTrigger>*/}
        {/*  <DialogContent className='w-1/5 bg-neutral-800 text-white border-none'>*/}
        {/*    <DialogHeader>*/}
        {/*      <DialogTitle className='text-center'>Konnektor módosítása</DialogTitle>*/}
        {/*    </DialogHeader>*/}
        {/*    <div className='flex flex-row py-2 justify-evenly'>*/}
        {/*      <div className='flex flex-row items-center justify-between gap-4'>*/}
        {/*        <Label htmlFor='name' className='text-right'>*/}
        {/*          Név*/}
        {/*        </Label>*/}
        {/*        <Input*/}
        {/*          type='text'*/}
        {/*          id='name'*/}
        {/*          value={name}*/}
        {/*          onChange={(e) => {*/}
        {/*            setName(e.target.value);*/}
        {/*          }}*/}
        {/*          className='bg-neutral-800 text-white'*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <Select onValueChange={(e) => setIcon(Object.keys(Icons)[+e].toString())}>*/}
        {/*          <SelectTrigger className='w-[40px] p-0 outline-none border-none focus:outline-none focus:shadow-none bg-neutral-800'>*/}
        {/*            <SelectValue*/}
        {/*              placeholder={*/}
        {/*                <img alt='icon' height='64' src={Icons['microwave']} width='64' />*/}
        {/*              }*/}
        {/*            />*/}
        {/*          </SelectTrigger>*/}
        {/*          <SelectContent>*/}
        {/*            <SelectGroup>*/}
        {/*              {Object.keys(Icons).map((value, index) => {*/}
        {/*                return (*/}
        {/*                  <SelectItem value={index.toString()}>*/}
        {/*                    <img alt='icon' height='64' width='64' src={Icons[value]} />*/}
        {/*                  </SelectItem>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </SelectGroup>*/}
        {/*          </SelectContent>*/}
        {/*        </Select>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className='flex flex-row py-2'>*/}
        {/*      <div className='flex flex-row items-center gap-3'>*/}
        {/*        <Label htmlFor='name' className='text-right'>*/}
        {/*          DeviceId*/}
        {/*        </Label>*/}
        {/*        <Input*/}
        {/*          type='text'*/}
        {/*          id='name'*/}
        {/*          value={deviceId}*/}
        {/*          onChange={(e) => {*/}
        {/*            setDeviceId(e.target.value);*/}
        {/*          }}*/}
        {/*          className='bg-neutral-800 text-white'*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <HexColorPicker color={color} onChange={setColor} className='react-colorful' />*/}
        {/*    <DialogFooter>*/}
        {/*      <DialogClose asChild>*/}
        {/*        <Button*/}
        {/*          className='mx-auto bg-gray-200 text-black font-bold hover:bg-gray-300'*/}
        {/*          type='submit'*/}
        {/*          onClick={handlePlugCreation}*/}
        {/*        >*/}
        {/*          Módosítás*/}
        {/*        </Button>*/}
        {/*      </DialogClose>*/}
        {/*    </DialogFooter>*/}
        {/*  </DialogContent>*/}
        {/*</Dialog>*/}
      </div>

      <div className='pt-10'></div>
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
