import type { Notification } from '../types';

interface ActivityFeedProps {
  notifications: Notification[];
}

export default function ActivityFeed({ notifications }: ActivityFeedProps) {
  return (
    <div className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
      <h3 className='mb-3 text-lg font-semibold text-gray-800 flex items-center gap-2'>
        <span className='text-xl'>🔔</span>
        Activity Feed
      </h3>
      <div className='space-y-2 max-h-60 overflow-y-auto'>
        {notifications.length === 0 ? (
          <p className='text-gray-500 text-sm text-center py-4'>
            No activity yet...
          </p>
        ) : (
          notifications
            .slice(-5)
            .reverse()
            .map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg text-sm ${
                  notification.type === 'join'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                <div className='flex items-center gap-2'>
                  <span>{notification.type === 'join' ? '➡️' : '⬅️'}</span>
                  <span className='flex-1'>{notification.message}</span>
                </div>
                <div className='text-xs opacity-75 mt-1'>
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
