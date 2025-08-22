import { useState } from 'react';

interface RoomControlProps {
  currentRoom: string;
  isConnected: boolean;
  onJoinRoom: (roomName: string) => void;
  onLeaveRoom: () => void;
}

export default function RoomControl({
  currentRoom,
  isConnected,
  onJoinRoom,
  onLeaveRoom,
}: RoomControlProps) {
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    if (roomName.trim() && isConnected) {
      onJoinRoom(roomName.trim());
      setRoomName('');
    }
  };

  return (
    <div className='mb-6'>
      <div className='text-sm font-medium text-gray-700 mb-3'>Room</div>

      {!currentRoom ? (
        <div className='space-y-2'>
          <input
            type='text'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder='Room name'
            className='w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400'
            onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
          />
          <button
            onClick={handleJoinRoom}
            disabled={!roomName.trim() || !isConnected}
            className='w-full px-3 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
            Join
          </button>
        </div>
      ) : (
        <div className='space-y-2'>
          <div className='px-3 py-2 bg-gray-50 rounded text-sm'>
            <span className='text-gray-600'>In:</span>{' '}
            <span className='font-medium'>{currentRoom}</span>
          </div>
          <button
            onClick={onLeaveRoom}
            className='w-full px-3 py-2 border border-gray-200 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors'>
            Leave
          </button>
        </div>
      )}
    </div>
  );
}
