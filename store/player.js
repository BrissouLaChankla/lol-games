import { create } from 'zustand'

export const useStore = create(set => ({
    name: '',
    avatar: new Date().getDay().toString(),
    roomId: Math.random().toString(36).slice(2, 9) + Date.now().toString(36),
    isJoining: false,
    setRoomId: (id) => set(() => ({ roomId: id })),
    setIsJoining: (bool) => set(() => ({ isJoining: bool })),
    setName: (name) => set(() => ({ name })),
    setAvatar: (avatar) => set(() => ({ avatar })),
}));