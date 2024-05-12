import { WebSocketComponent } from './WebSocketComponent.tsx';
import { useState } from 'react';

export function OldHomeComponent() {
  const [rooms, setRooms] = useState('');
  const [joinedRooms, setJoinedRooms] = useState<string[]>([]);

  const handleJoinRoom = () => {
    const roomsArray = rooms.split(',').map((room) => room.trim());
    setJoinedRooms(roomsArray); // Set the joined rooms
  };

  const handleLeaveRoom = () => {
    setJoinedRooms([]); // Leave the rooms
  };

  return (
    <>
      <div className='flex'>
        <input
          type='text'
          className='m-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          required
        />
        <button
          className='m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
        <button
          className='m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </div>
      {joinedRooms && <WebSocketComponent className='px-4' room={joinedRooms} />}
    </>
  );
}
