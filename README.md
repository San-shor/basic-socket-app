# 🚀 Basic Socket.IO Chat Application

A learning project demonstrating fundamental Socket.IO concepts including real-time messaging, room management, and client-server communication patterns.

![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-18-blue)

## 📚 What You'll Learn

This application demonstrates essential Socket.IO concepts:

### 🔌 **Basic Client-Server Communication**

- Establishing WebSocket connections between client and server
- Handling connection and disconnection events
- Real-time bidirectional communication

### 💬 **Message Broadcasting**

- **Individual messaging**: Send messages to specific clients
- **Global broadcasting**: Send messages to all connected clients
- **Room-based messaging**: Send messages only to users in specific rooms

### 🏠 **Room Management**

- **Joining rooms**: How users can join specific chat rooms
- **Leaving rooms**: How users can leave rooms and return to global chat
- **Room isolation**: Messages only visible to users in the same room

### 👥 **User Management**

- Track connected users count
- Handle user join/leave notifications
- Manage user sessions and cleanup

## 🏗️ How It Works

### **Global Chat vs Room Chat**

```
📱 Client A (Global) ←→ 🖥️ Server ←→ 📱 Client B (Global)
                         ↕️
📱 Client C (Room-1) ←→ 🖥️ Server ←→ 📱 Client D (Room-1)
```

- **Global users** see messages from other global users only
- **Room users** see messages from their specific room only
- **Server** routes messages based on user location (global vs room)

### **Key Socket.IO Events**

#### **Client → Server**

- `sendMsg` - Send a message to current location (global or room)
- `join-room` - Join a specific room
- `leave-room` - Leave current room and return to global

#### **Server → Client**

- `rcvMsg` - Receive a message from another user
- `user-joined` - Notification when someone joins your room
- `user-left` - Notification when someone leaves your room
- `clients-count` - Updated count of connected users

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

## 💡 Socket.IO Implementation Details

### **Server-Side Logic**

#### **Message Handling**

```javascript
// Send message to room or globally
socket.on('sendMsg', (message) => {
  if (socket.currentRoom) {
    // Send to room only
    socket.to(socket.currentRoom).emit('rcvMsg', data);
  } else {
    // Send to all users not in rooms
    socket.broadcast.emit('rcvMsg', data);
  }
});
```

#### **Room Management**

```javascript
// Join room
socket.on('join-room', (roomName) => {
  socket.join(roomName);
  socket.currentRoom = roomName;
  socket.to(roomName).emit('user-joined', notification);
});

// Leave room
socket.on('leave-room', (roomName) => {
  socket.leave(roomName);
  socket.currentRoom = null;
  socket.to(roomName).emit('user-left', notification);
});
```

### **Client-Side Logic**

#### **Message Receiving**

```javascript
// Listen for incoming messages
socket.on('rcvMsg', (data) => {
  // Add message to UI if not from self
  if (!message.isOwnMessage) {
    setMessages((prev) => [...prev, message]);
  }
});
```

#### **Room Notifications**

```javascript
// Handle room join/leave events
socket.on('user-joined', (data) => {
  setNotifications((prev) => [...prev, notification]);
  setMessages([]); // Clear messages on room changes
});
```

## 🎯 Learning Outcomes

After studying this application, you'll understand:

### **Socket.IO Fundamentals**

- How to establish WebSocket connections
- Event-driven communication patterns
- Real-time bidirectional messaging

### **Room Concepts**

- Creating and managing chat rooms
- Broadcasting messages to specific groups
- User isolation and message routing

### **Client State Management**

- Handling connection states in React
- Managing real-time UI updates
- Synchronizing server and client state

### **Real-World Patterns**

- Message broadcasting strategies
- User session management
- Event naming conventions

## 🧪 Test the Features

1. **Global Chat**: Open multiple tabs - messages appear to all users
2. **Room Chat**: Create a room in one tab, join it from another tab
3. **Room Isolation**: Users in different rooms don't see each other's messages
4. **User Tracking**: Watch the user count update as you open/close tabs
5. **Notifications**: See join/leave notifications when users change rooms

## 🔄 Key Socket.IO Patterns Demonstrated

- **Broadcasting**: `socket.broadcast.emit()` vs `socket.to(room).emit()`
- **Room Management**: `socket.join()` and `socket.leave()`
- **Event Handling**: Custom events like `sendMsg`, `join-room`
- **State Tracking**: Storing user room information on socket object

This is a foundational project perfect for understanding Socket.IO basics before building more complex real-time applications.
