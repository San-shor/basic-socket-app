# Real-Time Chat Application 💬

A modern real-time chat application built with React, Socket.IO, and Node.js that supports both global chat and private room-based messaging.

## ✨ Features

- **Real-time messaging** with instant delivery
- **Room-based chat** - Create and join private chat rooms
- **Global chat** - Chat with all connected users when not in a room
- **Live user count** - See how many users are online
- **Activity notifications** - Get notified when users join/leave rooms
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **Connection status** - Visual indicator of connection state
- **Auto-scroll** - Messages automatically scroll to the latest

## 🏗️ Architecture

The application uses a client-server architecture with Socket.IO for real-time communication:

![Room-Based Messaging Flow](./architecture-diagram.svg)

### How it works:

- **Users A & B** are in Room 1 - they can chat with each other privately
- **User C** is in Global Chat - messages go to all users not in rooms
- **Room members** only see messages from their room, Global users only see global messages

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd basic-socket-app
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server**

   ```bash
   cd server
   npm start
   ```

   Server will run on `http://localhost:5000`

2. **Start the client** (in a new terminal)

   ```bash
   cd client
   npm run dev
   ```

   Client will run on `http://localhost:5173`

3. **Open multiple browser tabs** to test the chat functionality

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **ES6 Modules** - Modern JavaScript modules

## 📁 Project Structure

```
basic-socket-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── ChatArea.tsx
│   │   │   ├── ConnectionStatus.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── RoomControl.tsx
│   │   │   └── index.ts
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Socket.IO server
│   └── package.json
├── architecture-diagram.svg # Architecture diagram
└── README.md
```

## 🔧 Component Architecture

The frontend is organized into reusable components:

- **`ConnectionStatus`** - Shows connection state and online user count
- **`RoomControl`** - Handles room creation and joining
- **`ActivityFeed`** - Displays user join/leave notifications
- **`ChatArea`** - Message display with auto-scroll
- **`MessageInput`** - Message composition and sending

## 🌟 Key Features Explained

### Room-Based Messaging

- Users can create and join named chat rooms
- Messages are only visible to users in the same room
- Users not in any room participate in global chat
- Automatic room cleanup when users disconnect

### Real-Time Updates

- Instant message delivery using WebSocket connections
- Live user count updates
- Real-time join/leave notifications
- Connection status indicators

### Modern UI/UX

- Responsive design that works on all devices
- Clean, modern interface with emojis and icons
- Visual feedback for all user actions
- Auto-scrolling message area

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Message history persistence
- [ ] File and image sharing
- [ ] Private direct messaging
- [ ] Room moderation features
- [ ] Message reactions and emojis
- [ ] Push notifications
- [ ] Mobile app version

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
