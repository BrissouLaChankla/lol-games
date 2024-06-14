"use client";
import { stringToAvatar } from "@/utils/avatar";
import { motion, AnimatePresence } from "framer-motion";

export default function Leaderboard({ scores }) {
    return (
        <AnimatePresence>
            {scores.sort((a, b) => b.score - a.score).map(player => (
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    key={player.id}
                    className="border-2 border-primary rounded-full px-1 py-0.5 flex items-center my-4"
                >
                    <div className="avatar">
                        <div className="w-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-4">
                            <img src={stringToAvatar(player.avatar)} alt={`${player.name}'s avatar`} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center grow px-4">
                        <h3 className="text-lg font-medium">{player.name}</h3>
                        <span className="text-primary font-medium">{player.score}</span>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}
