interface ConnectionStatusProps {
  isConnected: boolean;
  connectedClients: number;
}

export default function ConnectionStatus({
  isConnected,
  connectedClients,
}: ConnectionStatusProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`}></div>
        {isConnected ? 'Connected' : 'Disconnected'}
      </div>
      <div className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
        <span className='text-base'>👥</span>
        {connectedClients} Online
      </div>
    </div>
  );
}
