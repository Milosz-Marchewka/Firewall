import { io } from 'socket.io-client';

// Backend base URL (Express + Socket.IO server)
// Populated from .env.local at dev time
export const API_BASE = import.meta.env.VITE_SERVER_IP || 'http://localhost:5000';

// Create a single shared socket instance for the app.
// (Socket.IO will connect lazily on first use unless you call socket.connect())
export const socket = io(API_BASE, {
    autoConnect: false,
});
