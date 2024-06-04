import { create } from 'zustand'

export const useStoreRoom = create(set => ({
    players: [],
    updatePlayers: (players) => set(() => ({ players })),
}));