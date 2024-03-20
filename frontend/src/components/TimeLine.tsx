export function TimeLine() {
  const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 2, 4];
  return (
    <>
      <div className='container mx-auto flex flex-row items-center justify-between rounded-xl'>
        <div className='w-1/6 flex flex-row items-center justify-between rounded-l-xl bg-gray-300'>
          <p className='text-2xl mx-auto'>Óra ⌚</p>
        </div>
        <div className='grid grid-cols-12 flex-grow h-1/4 px-10 gap-6 rounded-r-xl text-2xl bg-gray-300'>
          {hours.map((hour) => (
            <div key={hour}>{hour + 'h'}</div>
          ))}
        </div>
      </div>
      {/*<div className='container mx-auto flex flex-row'>*/}
      {/*  <div className='w-1/6 flex flex-row items-center justify-between rounded-l-xl bg-gray-300'>*/}
      {/*    <p className='text-2xl mx-auto'>Óra ⌚</p>*/}
      {/*  </div>*/}

      {/*  <div className='grid grid-cols-12 flex-grow h-1/4 px-10 gap-6 rounded-r-xl text-2xl bg-gray-300'>*/}
      {/*    {hours.map((hour) => (*/}
      {/*      <div key={hour}>{hour + 'h'}</div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
