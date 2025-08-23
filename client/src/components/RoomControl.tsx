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
    <div className='mb-8'>
      <div className='flex items-center gap-2 mb-4'>
        <svg
          className='w-5 h-5 text-slate-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
          />
        </svg>
        <h2 className='text-base font-semibold text-slate-800'>Room</h2>
      </div>

      {!currentRoom ? (
        <div className='space-y-3'>
          <div className='relative'>
            <input
              type='text'
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder='Enter room name'
              className='w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder-slate-400'
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
          </div>
          <button
            onClick={handleJoinRoom}
            disabled={!roomName.trim() || !isConnected}
            className='w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none'>
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                />
              </svg>
              Join Room
            </span>
          </button>
        </div>
      ) : (
        <div className='space-y-3'>
          <div className='px-4 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/60 rounded-xl'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
              <span className='text-sm text-slate-600'>Connected to</span>
            </div>
            <div className='font-semibold text-slate-800 mt-1 text-base'>
              {currentRoom}
            </div>
          </div>
          <button
            onClick={onLeaveRoom}
            className='w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 text-sm font-medium rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all duration-200'>
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Leave Room
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
