import { useState, useRef } from 'react';

interface MessageInputProps {
  isConnected: boolean;
  onSendMessage: (message: string) => void;
}

export default function MessageInput({
  isConnected,
  onSendMessage,
}: MessageInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() && isConnected) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='flex gap-2 items-center p-4 border-t border-gray-200 bg-white'>
      <input
        type='text'
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isConnected}
        placeholder={isConnected ? 'Type a message...' : 'Offline'}
        className='flex-1 px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400'
      />
      <button
        type='button'
        onClick={handleSendMessage}
        disabled={!isConnected || !inputValue.trim()}
        className='px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
        Send
      </button>
    </div>
  );
}
