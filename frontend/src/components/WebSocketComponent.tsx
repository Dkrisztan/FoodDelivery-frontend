import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface WebSocketComponentProps {
  room: string[];
  className?: string;
}

export function WebSocketComponent({
  room,
  className,
}: WebSocketComponentProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
      for (const r of room) socket.emit('join-room', r);
    });

    socket.on('frontendData', (data) => {
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  return (
    <div className={className}>
      <h1>Message from WebSocket: {message}</h1>
    </div>
  );
}
