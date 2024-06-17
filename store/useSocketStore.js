import { create } from 'zustand';
import io from 'socket.io-client';

const ADDRESS_BACK = process.env.ADDRESS_BACK || "toto"


export const useSocketStore = create((set) => ({
    socket: null,
    connect: () => set((state) => {
        if (!state.socket) {
            const socket = io(ADDRESS_BACK); // Correction de la méthode de connexion
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