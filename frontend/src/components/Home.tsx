import bg from '../assets/homepage.png';
import { FaRightToBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { SVGProps, useRef } from 'react';
import { JSX } from 'react/jsx-runtime';
import { TypeAnimation } from 'react-type-animation';
import { useIsVisible } from '@/components/hooks/useIsVisible.tsx';
import krisztian from '../assets/krisztian-circle.png';
import adam from '../assets/adam-circle.png';
import hunor from '../assets/hunor-circle.png';
import tuyaplug from '../assets/tuyaplug.jpeg';

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

  const refToScroll = useRef(null);

  const refLast = useRef(null);
  const isVisible = useIsVisible(refLast);

  const onLoginClick = () => {
    navigate('/login');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  const scrollToElement = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    refToScroll.current.scrollIntoView({ behavior: 'smooth' });
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
            1000,
            'Idősfelügyelet modern technológiával',
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
        <div
          className='absolute bottom-0 mb-8 animate-bounce'
          onClick={scrollToElement}
          style={{ cursor: 'pointer' }}
        >
          <ArrowDownIcon className='h-10 w-10' />
        </div>
      </div>
      <div
        ref={refToScroll}
        className='w-full h-screen flex flex-col items-center snap-start bg-[#EFC6BD]'
      >
        <div className='text-7xl font-bold pt-10 pb-20'>A termék</div>
        <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row'>
          <img
            className='object-cover w-full rounded-t-lg md:w-96 md:rounded-none md:rounded-s-lg'
            src={tuyaplug}
            alt=''
          />
          <div className='flex flex-col justify-between p-4 leading-normal'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Noteworthy technology acquisitions 2021
            </h5>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
              chronological order.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full h-screen flex flex-col snap-start bg-[#A0D8B3] justify-center gap-32'>
        <div
          ref={refLast}
          className={`text-center text-6xl font-bold mb-4 transition-transform transform translate-y-full opacity-0 duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0'}`}
        >
          Akik nélkül nem jöhetett volna létre
        </div>
        <div className='flex flex-row gap-36 justify-center items-center'>
          <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center pb-10 pt-8'>
              <img
                className='w-64 h-64 mb-3 rounded-full shadow-lg'
                src={hunor}
                alt='Dr. Sántha Hunor'
              />
              <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                Dr. Sántha Hunor
              </h5>
              <span className='text-sm text-gray-600 dark:text-gray-400 pb-4'>Feltaláló</span>
              <p className='font-semibold text-xl'>Ötletgazda & Megrendelő</p>
            </div>
          </div>
          <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center pb-10 pt-8'>
              <img
                className='w-64 h-64 mb-3 rounded-full shadow-lg'
                src={krisztian}
                alt='Dancs Krisztián'
              />
              <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                Dancs Krisztián
              </h5>
              <span className='text-sm text-gray-600 dark:text-gray-400 pb-4'>
                BME mérnökinformatika BSc.
              </span>
              <p className='font-semibold text-xl'>Web applikáció felelős</p>
            </div>
          </div>
          <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center pb-10 pt-8'>
              <img
                className='w-64 h-64 mb-3 rounded-full shadow-lg'
                src={adam}
                alt='Varga Ádám Marcell'
              />
              <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                Varga Ádám Marcell
              </h5>
              <span className='text-sm text-gray-600 dark:text-gray-400 pb-4'>
                BME mérnökinformatika MSc.
              </span>
              <p className='font-semibold text-xl'>Mobil applikáció felelős</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
