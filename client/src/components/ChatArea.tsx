import { useRef, useEffect } from 'react';
import type { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  currentRoom: string;
}

export default function ChatArea({ messages, currentRoom }: ChatAreaProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex-1 border-b border-slate-200/60 bg-white/30 backdrop-blur-sm'>
      <div className='px-4 sm:px-6 py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
          <span className='text-sm font-semibold text-slate-800'>
            {currentRoom ? `#${currentRoom}` : 'Global Chat'}
          </span>
        </div>
      </div>

      <div className='p-4 sm:p-6 h-96 lg:h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-blue-500'
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
              <p className='text-slate-500 text-sm font-medium'>
                Start the conversation
              </p>
              <p className='text-slate-400 text-xs mt-1'>
                Send a message to get things going!
              </p>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwnMessage ? 'justify-end' : 'justify-start'
                }`}>
                <div className='flex items-start gap-2 max-w-xs sm:max-w-md lg:max-w-lg'>
                  {!message.isOwnMessage && (
                    <div className='w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1'>
                      {message.socketId.slice(-2).toUpperCase()}
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.isOwnMessage
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                        : 'bg-white/80 backdrop-blur-sm text-slate-800 border border-slate-200/60 rounded-bl-md'
                    }`}>
                    <div className='text-sm leading-relaxed'>
                      {message.text}
                    </div>
                    <div
                      className={`text-xs mt-2 flex items-center gap-1 ${
                        message.isOwnMessage
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}>
                      <span className='font-medium'>
                        {message.isOwnMessage
                          ? 'You'
                          : `User ${message.socketId.slice(-4)}`}
                      </span>
                      <span>•</span>
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  {message.isOwnMessage && (
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1'>
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={elementRef} />
          </div>
        )}
      </div>
    </div>
  );
}
