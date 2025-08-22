import type { Notification } from '../types';

interface ActivityFeedProps {
  notifications: Notification[];
}

export default function ActivityFeed({ notifications }: ActivityFeedProps) {
  return (
    <div className='mb-6'>
      <div className='text-sm font-medium text-gray-700 mb-3'>Activity</div>
      <div className='space-y-1 max-h-48 overflow-y-auto'>
        {notifications.length === 0 ? (
          <p className='text-gray-400 text-xs py-2'>No activity</p>
        ) : (
          notifications
            .slice(-5)
            .reverse()
            .map((notification) => (
              <div key={notification.id} className='text-xs text-gray-500 py-1'>
                <span
                  className={
                    notification.type === 'join'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }>
                  {notification.type === 'join' ? '→' : '←'}
                </span>
                <span className='ml-2'>{notification.message}</span>
                <span className='ml-2 text-gray-400'>
                  {notification.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
