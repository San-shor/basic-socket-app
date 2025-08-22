interface ConnectionStatusProps {
  isConnected: boolean;
  connectedClients: number;
}

export default function ConnectionStatus({
  isConnected,
  connectedClients,
}: ConnectionStatusProps) {
  return (
    <div className='flex items-center gap-3 text-sm text-gray-600'>
      <div className='flex items-center gap-1.5'>
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
        <span>{isConnected ? 'Online' : 'Offline'}</span>
      </div>
      <div className='text-gray-400'>•</div>
      <div className='flex items-center gap-1'>
        <span>{connectedClients}</span>
        <span>users</span>
      </div>
    </div>
  );
}
