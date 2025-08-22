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
    <div className='flex-1 border-b border-gray-200 bg-white'>
      <div className='px-4 py-3 border-b border-gray-100'>
        <div className='text-sm font-medium text-gray-700'>
          {currentRoom ? currentRoom : 'Global'}
        </div>
      </div>

      <div className='p-4 h-96 overflow-y-auto'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-400 text-sm text-center'>No messages yet</p>
          </div>
        ) : (
          <div className='space-y-3'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwnMessage ? 'justify-end' : 'justify-start'
                }`}>
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded text-sm ${
                    message.isOwnMessage
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                  <div className='mb-1'>{message.text}</div>
                  <div
                    className={`text-xs ${
                      message.isOwnMessage ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    {message.isOwnMessage ? 'You' : message.socketId.slice(-6)}{' '}
                    •{' '}
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
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
