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

<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#f8fafc"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e293b">Room-Based Messaging Flow</text>
  
  <!-- Server -->
  <rect x="350" y="60" width="100" height="60" rx="10" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="400" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Socket.IO</text>
  <text x="400" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Server</text>
  
  <!-- Users -->
  <circle cx="150" cy="200" r="30" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="150" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="white">User A</text>
  
  <circle cx="400" cy="200" r="30" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="400" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="white">User B</text>
  
  <circle cx="650" cy="200" r="30" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="650" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="white">User C</text>
  
  <!-- Connection lines to server -->
  <line x1="180" y1="190" x2="360" y2="110" stroke="#6b7280" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="400" y1="170" x2="400" y2="120" stroke="#6b7280" stroke-width="2" stroke-dasharray="5,5"/>
  <line x1="620" y1="190" x2="440" y2="110" stroke="#6b7280" stroke-width="2" stroke-dasharray="5,5"/>
  
  <!-- Room 1 -->
  <rect x="80" y="300" width="240" height="120" rx="15" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <text x="200" y="325" text-anchor="middle" font-size="14" font-weight="bold" fill="#0284c7">Room 1</text>
  
  <!-- Users in Room 1 -->
  <circle cx="130" cy="360" r="20" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="130" y="365" text-anchor="middle" font-size="10" font-weight="bold" fill="white">A</text>
  
  <circle cx="270" cy="360" r="20" fill="#10b981" stroke="#059669" stroke-width="2"/>
  <text x="270" y="365" text-anchor="middle" font-size="10" font-weight="bold" fill="white">B</text>
  
  <!-- Message flow in Room 1 -->
  <path d="M 150 360 Q 200 340 250 360" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
  <path d="M 250 360 Q 200 380 150 360" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowhead)"/>
  
  <!-- Global Chat -->
  <rect x="480" y="300" width="240" height="120" rx="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="600" y="325" text-anchor="middle" font-size="14" font-weight="bold" fill="#d97706">Global Chat</text>
  
  <!-- User in Global -->
  <circle cx="600" cy="360" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="600" y="365" text-anchor="middle" font-size="10" font-weight="bold" fill="white">C</text>
  
  <!-- Arrows from users to their chat areas -->
  <line x1="150" y1="230" x2="130" y2="340" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="230" x2="270" y2="340" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="650" y1="230" x2="600" y2="340" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowhead)"/>
  
  <!-- Labels -->
  <text x="200" y="450" text-anchor="middle" font-size="12" fill="#0284c7">Messages only visible to Room 1 members</text>
  <text x="600" y="450" text-anchor="middle" font-size="12" fill="#d97706">Messages visible to users not in any room</text>
  
  <!-- Legend -->
  <rect x="50" y="500" width="700" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="70" y="525" font-size="14" font-weight="bold" fill="#1e293b">How it works:</text>
  <text x="70" y="545" font-size="12" fill="#475569">• Users A & B are in Room 1 - they can chat with each other privately</text>
  <text x="70" y="560" font-size="12" fill="#475569">• User C is in Global Chat - messages go to all users not in rooms</text>
  <text x="70" y="575" font-size="12" fill="#475569">• Room members only see messages from their room, Global users only see global messages</text>
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#10b981"/>
    </marker>
  </defs>
</svg>

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
