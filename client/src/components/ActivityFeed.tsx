import type { Notification } from '../types';

interface ActivityFeedProps {
  notifications: Notification[];
}

export default function ActivityFeed({ notifications }: ActivityFeedProps) {
  return (
    <div className='mb-6'>
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
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
        <h2 className='text-base font-semibold text-slate-800'>Activity</h2>
      </div>
      <div className='space-y-2 max-h-64 overflow-y-auto custom-scrollbar'>
        {notifications.length === 0 ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <svg
                  className='w-6 h-6 text-slate-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                  />
                </svg>
              </div>
              <p className='text-slate-400 text-xs'>No activity yet</p>
            </div>
          </div>
        ) : (
          notifications
            .slice(-5)
            .reverse()
            .map((notification) => (
              <div
                key={notification.id}
                className='bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-lg p-3 transition-all hover:bg-white/80'>
                <div className='flex items-start gap-2'>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'join'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                    {notification.type === 'join' ? (
                      <svg
                        className='w-3 h-3'
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
                    ) : (
                      <svg
                        className='w-3 h-3'
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
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-slate-700 font-medium leading-relaxed'>
                      {notification.message}
                    </p>
                    <p className='text-xs text-slate-400 mt-1'>
                      {notification.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
