import { create } from 'zustand';
import io from 'socket.io-client';

export const useSocketStore = create((set) => ({
    socket: null,
    connect: () => set((state) => {
        if (!state.socket) {
            const socket = io(process.env.NEXT_PUBLIC_ADDRESS_BACK); // Correction de la méthode de connexion
            socket.on('connect_error', (err) => {
                console.error('Connection Error:', err);
            });
            return { socket };
        }
        return state;
    }),
    disconnect: () => set((state) => {
        console.log("BYE BYE")
        if (state.socket) {
            state.socket.disconnect();
            return { socket: null };
        }
        return state;
    }),
}));