import { useState } from 'react';

interface PlugProps {
  name: string;
  color: string;
}
export function Plug({ name, color }: PlugProps) {
  const [isMidOpen, setMidIsOpen] = useState(false);
  const [isBottomOpen, setBottomIsOpen] = useState(false);

  const oldHours = Array.from({ length: 12 }, (_, index) => (index + 1) * 2).reverse();
  const hours = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  console.log(hours);

  console.log(color);
  const toggleOpen = () => {
    setBottomIsOpen(!isBottomOpen);
    setMidIsOpen(!isMidOpen);
  };

  return (
    <>
      <div className='container mx-auto mt-8 rounded-xl mb-4 flex flex-col h-auto'>
        <div
          style={{ backgroundColor: color }}
          className={`h-1/4 py-2 flex flex-row items-center justify-between rounded-t-xl ${isMidOpen ? '' : 'rounded-b-xl'}`}
        >
          <p className='text-2xl mx-auto'>{name} 🔌</p>
          <div className='px-4'>
            <button
              className='rounded-md bg-yellow-500 px-3 py-0.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-yellow-500'
              onClick={toggleOpen}
            >
              {isMidOpen ? 'Close' : 'Open'}
            </button>
          </div>
        </div>

        <hr className={`border-black ${isMidOpen || isBottomOpen ? '' : 'hidden'}`} />

        <div
          className={`grid grid-cols-12 flex-grow px-8 h-full bg-lime-50 overflow-hidden transition-all ${isMidOpen ? 'py-2' : 'max-h-0'}`}
        >
          {/* Render 12 columns */}
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className='col-span-1 relative'>
              {hours.includes(new Date().getHours() + 1 - index * 2) && (
                <div className='bg-red-500 w-12 h-2 rounded'></div>
              )}
            </div>
          ))}
        </div>

        <hr className={`border-black ${isMidOpen || isBottomOpen ? '' : 'hidden'}`} />

        <div
          className={`flex flex-row h-1/4 px-8 items-center justify-between bg-fuchsia-300 rounded-b-xl transition-all ${isBottomOpen ? 'py-2' : 'max-h-0'}`}
        >
          {hours.map((hour) => (
            <div key={hour} className={isBottomOpen ? '' : 'hidden'}>
              {new Date().getHours() - hour >= 0
                ? new Date().getHours() - hour
                : new Date().getHours() - hour + 24}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
