import bg from '../assets/homepage.png';
import { FaRightToBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

export function Home() {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='w-full h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-200'>
      <div
        className='w-full h-screen flex flex-col justify-center items-center snap-start bg-cover bg-center'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='text-7xl font-bold pb-20'>Üdvözlünk a Hogyvagymaapa weboldalán!</div>
        <div className='flex flex-row justify-center items-center gap-10'>
          <button
            type='button'
            className='w-full rounded-md px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 bg-[#259372] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#1e7e61] hover:shadow-primary-2'
            onClick={onRegisterClick}
          >
            <div className='flex flex-row items-center gap-2 text-xl'>
              Regisztrálás <FaUserPlus className='w-5 h-5' />
            </div>
          </button>
          <button
            type='button'
            className='w-full rounded-md px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 bg-[#7061A8] flex justify-center items-center transition duration-300 ease-in-out hover:bg-[#554884] hover:shadow-primary-2'
            onClick={onLoginClick}
          >
            <div className='flex flex-row items-center gap-2 text-xl'>
              Bejelentkezés <FaRightToBracket className='w-5 h-5' />
            </div>
          </button>
        </div>
      </div>
      <div className='w-full h-screen flex justify-center items-center snap-start'>Second Page</div>
      <div className='w-full h-screen flex justify-center items-center snap-start'>Third Page</div>
      <div className='w-full h-screen flex justify-center items-center snap-start'>Fourth Page</div>
    </div>
  );
}
