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
    <div className='mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200'>
      <h3 className='mb-3 text-lg font-semibold text-gray-800 flex items-center gap-2'>
        <span className='text-xl'>🏠</span>
        Create a room
      </h3>

      {!currentRoom ? (
        <div className='space-y-3'>
          <input
            type='text'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder='Enter room name...'
            className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
            onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
          />
          <button
            onClick={handleJoinRoom}
            disabled={!roomName.trim() || !isConnected}
            className='w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
            🚪 Join Room
          </button>
        </div>
      ) : (
        <div className='space-y-3'>
          <div className='p-3 bg-green-100 rounded-lg border border-green-300'>
            <p className='m-0 text-green-800 text-sm font-medium'>
              📍 Currently in: <strong>{currentRoom}</strong>
            </p>
          </div>
          <button
            onClick={onLeaveRoom}
            className='w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors'>
            🚪 Leave Room
          </button>
        </div>
      )}
    </div>
  );
}
