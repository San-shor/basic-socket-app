export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  socketId: string;
  isOwnMessage: boolean;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  type: 'join' | 'leave';
}
