import watch from '../assets/wristwatch.png';

export function TimeLine() {
  const hours = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 1, 3];
  return (
    <>
      <div className='container mx-auto flex flex-row items-center justify-between rounded-xl pb-10'>
        <div className='w-1/6 flex flex-row items-center justify-between rounded-l-xl bg-gray-300 px-5'>
          <p className='text-2xl mx-auto'>Óra</p>
          <img src={watch} width={32} height={32} />
        </div>
        <div className='grid grid-cols-13 flex-grow h-1/4 px-10 gap-6 rounded-r-xl text-2xl bg-gray-300'>
          {hours.map((hour) => (
            <div key={hour}>{hour + 'h'}</div>
          ))}
        </div>
      </div>
    </>
  );
}
