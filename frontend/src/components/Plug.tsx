import Icons from '../utils/Icons.tsx';

interface PlugProps {
  name: string;
  color: string;
  index: number;
  icon: string;
}
export function Plug({ name, color, index, icon }: PlugProps) {
  let alternatingBackground = '#F1DFD0';
  if (index % 2 !== 0) alternatingBackground = '#F5E8DD';
  return (
    <>
      <div className='container mx-auto mt-4 mb-4 flex flex-row h-auto'>
        <div
          style={{ backgroundColor: color }}
          className='h-1/4 w-1/6 py-2 px-5 flex flex-row items-center justify-between rounded-l-xl'
        >
          <p className='text-2xl mx-auto'>{name}</p>
          <img src={Icons[icon]} width={32} height={32} alt='icon' />
        </div>

        <div
          style={{ backgroundColor: alternatingBackground }}
          className='grid grid-cols-12 flex-grow px-8 h-auto items-center rounded-r-xl'
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className='col-span-1 relative'>
              {<div style={{ backgroundColor: color }} className='w-12 h-2 rounded'></div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
