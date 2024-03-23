import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import userIcon from '../assets/user.png';
import { TimeLine } from './TimeLine.tsx';
import { Plug } from './Plug.tsx';

//! Used for testing
const plugArray = [
  {
    name: 'Kávéfőző',
    color: '#87abe6',
    icon: 'coffeeMaker',
  },
  {
    name: 'Hűtő',
    color: '#03fc94',
    icon: 'refrigerator',
  },
  {
    name: 'TV',
    color: '#8557c9',
    icon: 'television',
  },
  {
    name: 'Hősugárzó',
    color: '#eb09b6',
    icon: 'radiator',
  },
  {
    name: 'Mosógép',
    color: '#c7a5bf',
    icon: 'laundryMachine',
  },
  {
    name: 'Mikró',
    color: '#d3276c',
    icon: 'microwave',
  },
];

export function Profile() {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', config);
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className='container mx-auto mt-8'>
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
      </div>
      {/* Mapping over the user's plug array */}
      {plugArray.map((plug, index) => {
        return <Plug name={plug.name} color={plug.color} icon={plug.icon} index={index} />;
      })}
      <TimeLine />
    </>
  );
}
