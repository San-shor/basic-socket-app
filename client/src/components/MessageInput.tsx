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
    <div className='flex gap-3 items-center p-4 sm:p-6 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm'>
      <div className='relative flex-1'>
        <input
          type='text'
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isConnected}
          placeholder={
            isConnected
              ? 'Type your message...'
              : 'Disconnected - Unable to send messages'
          }
          className='w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 disabled:bg-slate-100 disabled:text-slate-400 disabled:placeholder-slate-300 transition-all placeholder-slate-500'
        />
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          <svg
            className='w-5 h-5 text-slate-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
        </div>
      </div>
      <button
        type='button'
        onClick={handleSendMessage}
        disabled={!isConnected || !inputValue.trim()}
        className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-2'>
        <span className='hidden sm:inline'>Send</span>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
          />
        </svg>
      </button>
    </div>
  );
}
