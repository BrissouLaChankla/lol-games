"use client"

import { useStore } from "@/store/player";

import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation';
import { useState } from "react";
export default function Home() {
  const { name, avatar, roomId, setName, setAvatar, isJoining } = useStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const avatarPicture = createAvatar(micah, {
    seed: avatar,
  });

  const svg = avatarPicture.toDataUriSync();

  // __

  const createGame = () => {
    if (name.length >= 3 && name.length <= 13) {
      setLoading(true);
      router.push('/lobby/' + roomId);
      return;
    }
    setError("Abuse sur le pseudo");
  }

  return (
    <main className='grow flex flex-col items-center justify-center'>
      <span className='relative'>
        <span className='rounded-full bg-primary/50 overflow-hidden w-80 h-80 grid place-content-center'>
          <AnimatePresence mode="wait">
            <motion.img
              initial={{ y: 22 }}
              animate={{ y: 12 }}
              exit={{ y: 22 }}
              key={avatar}
              src={svg} height={300} width={300} alt="Avatar" />
          </AnimatePresence>
        </span>
        <button className="btn absolute right-0 top-3/4 h-14 w-14 text-2xl rounded-full" onClick={() => setAvatar(Math.random().toString(36).slice(2))}>🔄️</button>
      </span>
      <div className='mt-8 flex'>

        <input type="text" placeholder="Pseudo" className="input input-bordered w-full max-w-xs rounded-r-none" value={name} onChange={(e) => setName(e.target.value)} />
        <button className={`${loading ? "btn-disabled" : "btn-primary"} btn rounded-l-none w-40`} onClick={() => createGame()}>
          {loading ? <span className="loading loading-spinner loading-sm"></span> : isJoining ? "Rejoindre la partie" : "Créer la partie"}
        </button>
      </div>

      {!!error && <span className="text-red-500 mt-3">↖️ {error}</span>}
    </main>
  );
}
