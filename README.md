# 🚀 Basic Socket.IO Chat Application

A learning project demonstrating fundamental Socket.IO concepts including real-time messaging, room management, and client-server communication patterns.

##Live Demo []

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

#### **Client → Server**

- `sendMsg` - Send a message to current location (global or room)
- `join-room` - Join a specific room
- `leave-room` - Leave current room and return to global

#### **Server → Client**

- `rcvMsg` - Receive a message from another user
- `user-joined` - Notification when someone joins your room
- `user-left` - Notification when someone leaves your room
- `clients-count` - Updated count of connected users

## 🧪 Test the Features

1. **Global Chat**: Open multiple tabs - messages appear to all users
2. **Room Chat**: Create a room in one tab, join it from another tab
3. **Room Isolation**: Users in different rooms don't see each other's messages
4. **User Tracking**: Watch the user count update as you open/close tabs
5. **Notifications**: See join/leave notifications when users change rooms

This is a foundational project perfect for understanding Socket.IO basics before building more complex real-time applications.
