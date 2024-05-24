import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface Plug {
  id: string;
  name: string;
  color: string;
  deviceId: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  password: string;
  plugs: Plug[];
}

const colorOptions = [
  'mustard-yellow',
  'mint-green',
  'dark-blue',
  'dark-orange',
  'dark-red',
  'light-pink',
];

export function Profile() {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const [profile, setProfile] = useState<Profile>({
    id: '',
    name: '',
    email: '',
    password: '',
    plugs: [],
  });

  const [selectedPlug, setSelectedPlug] = useState<Plug | null>(null);
  const navigate = useNavigate();
  const handlePlugSelection = (plugId: string) => {
    const selected = profile.plugs.find((plug) => plug.id === plugId) || null;
    setSelectedPlug(selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (selectedPlug) {
      const { id, value } = e.target;
      setSelectedPlug({ ...selectedPlug, [id]: value });
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlug) {
      try {
        await axios.patch(
          `https://onlab-backend.vercel.app/plug/${selectedPlug.deviceId}`,
          { name: selectedPlug.name, color: selectedPlug.color },
          config,
        );
        fetchProfile();
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('accessToken'); // Remove the token cookie
    navigate('/'); // Redirect to the login page
  };

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
    const intervalId = setInterval(() => {
      fetchProfile();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='w-full px-[200px] mx-auto mt-8 relative'>
        <div className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
          <button
            onClick={handleLogout}
            className='absolute top-4 right-4 bg-red-500 text-white p-2 rounded'
          >
            Kijelentkezés
          </button>
          <div className='flex flex-row items-center'>
            <h1 className='text-2xl mb-4 flex items-center'>
              <img src={userIcon} width='64px' height='64px' alt='user' />
              {profile && profile.name.toUpperCase()}
            </h1>
          </div>
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
                <div className='flex flex-row justify-center items-center gap-2'>
                  <span className='bg-[#259372] text-white'>Válassz ki egy konnektort!</span>
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
          <div className='bg-[#B3B3F1] p-4 mt-5 border rounded-md'>
            <form>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
                  Név:
                </label>
                <input
                  type='text'
                  id='name'
                  value={selectedPlug.name}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='color' className='block text-gray-700 text-sm font-bold mb-2'>
                  Szín:
                </label>
                <select
                  id='color'
                  value={selectedPlug.color}
                  onChange={handleInputChange}
                  className='w-full p-2 border rounded'
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleSaveChanges} className='bg-[#23CE6B] text-white p-2 rounded'>
                Save Changes
              </button>
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
