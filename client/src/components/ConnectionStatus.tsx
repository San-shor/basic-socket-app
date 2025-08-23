interface ConnectionStatusProps {
  isConnected: boolean;
  connectedClients: number;
}

export default function ConnectionStatus({
  isConnected,
  connectedClients,
}: ConnectionStatusProps) {
  return (
    <div className='flex items-center gap-4 text-sm'>
      <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60'>
        <div className='relative'>
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          />
          {isConnected && (
            <div className='absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75' />
          )}
        </div>
        <span
          className={`font-medium ${
            isConnected ? 'text-emerald-700' : 'text-red-700'
          }`}>
          {isConnected ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60'>
        <svg
          className='w-4 h-4 text-slate-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
          />
        </svg>
        <span className='font-medium text-slate-700'>{connectedClients}</span>
        <span className='text-slate-600 hidden sm:inline'>
          {connectedClients === 1 ? 'user' : 'users'}
        </span>
      </div>
    </div>
  );
}
