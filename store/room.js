import { create } from 'zustand'

export const useStoreRoom = create(set => ({
    players: [],
    playerJoin: (players) => set(() => ({ players })),
    playerLeave: (player) => set((state) => ({ players: state.players.filter(el => el.id !== player.id) })),
}));