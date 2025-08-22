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
    <div className='mb-4 border border-gray-200 rounded-lg bg-white shadow-sm'>
      <div className='p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg'>
        <h3 className='m-0 text-lg font-semibold text-gray-800 flex items-center gap-2'>
          <span className='text-xl'>💭</span>
          {currentRoom ? `Chat - ${currentRoom}` : 'Global Chat'}
        </h3>
      </div>

      <div className='p-4 h-96 overflow-y-auto bg-gray-50'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500 text-center'>
              <span className='text-4xl mb-2 block'>📭</span>
              No messages yet... Start a conversation!
            </p>
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
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.isOwnMessage
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }`}>
                  <div className='text-sm font-medium'>{message.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {message.isOwnMessage ? 'You' : message.socketId.slice(-6)}{' '}
                    • {message.timestamp.toLocaleTimeString()}
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
