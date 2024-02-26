import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

export function Profile() {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const [profile, setProfile] = useState({
    id: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
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
    <div className='container mx-auto mt-8'>
      <div className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-2xl mb-4 flex items-center'>
          <FaUser className='mr-2' /> User Profile
        </h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>ID:</label>
          <p>{profile.id}</p>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
          <p>{profile.name}</p>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
          <p>{profile.email}</p>
        </div>
        {/* Don't display password in the UI */}
      </div>
    </div>
  );
}
