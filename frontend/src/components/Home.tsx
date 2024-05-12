import bg from '../assets/homepage.png';
import { FaRightToBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';
import { TypeAnimation } from 'react-type-animation';

function ArrowDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 5v14' />
      <path d='m19 12-7 7-7-7' />
    </svg>
  );
}

export function Home() {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='w-full h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-200 relative'>
      <div
        className='w-full h-screen flex flex-col justify-center items-center snap-start bg-cover bg-center relative'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Üdvözlünk a Hogyvagymaapa weboldalán!',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'We produce food for Hamsters',
            1000,
            'We produce food for Guinea Pigs',
            1000,
          ]}
          wrapper='span'
          speed={50}
          style={{
            fontSize: '5.5rem',
            fontWeight: 'bold',
            display: 'inline-block',
            paddingBottom: '5rem',
            fontFamily: 'Rubik, sans-serif',
            letterSpacing: '-0.05em',
          }}
          repeat={0}
        />
        {/*<div className='pb-20 text-7xl font-bold type-welcome'></div>*/}
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
        <div className='absolute bottom-0 mb-8 animate-bounce'>
          <ArrowDownIcon className='h-10 w-10' />
        </div>
      </div>
      <div className='w-full h-screen flex justify-center items-center snap-start'>Second Page</div>
      <div className='w-full h-screen flex justify-center items-center snap-start'>Third Page</div>
    </div>
  );
}
