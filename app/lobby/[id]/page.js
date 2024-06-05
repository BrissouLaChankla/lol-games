"use client";
import { useStore } from "@/store/player";
import { useStoreRoom } from "@/store/room";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from "react";
import socketIO from 'socket.io-client';

import { motion, AnimatePresence } from "framer-motion";

import { stringToAvatar } from "@/utils/avatar";


export default function page({ params }) {
    const { name, avatar, roomId, setRoomId, setIsJoining, id, setId } = useStore();
    const { players, updatePlayers } = useStoreRoom();
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const socketRef = useRef(null);

    useEffect(() => {

        // Si tu n'as pas de nom c'est que tu join, on te redirige sur la home avec indication
        if (!!!name) {
            setIsJoining(true)
            setRoomId(params.id)
            router.push('/');
            return;
        }

        const socket = socketIO.connect('http://localhost:4000');
        socketRef.current = socket;

        socket.on('storeOwnId', id => setId(id))


        socket.on('roomUsers', (data) => {
            updatePlayers(data)
        });


        socket.on('userDisconnected', data => {
            updatePlayers(data)
        })

        socket.on('startGame', () => {
            router.push('/game')
        })

        socket.emit('joinRoom', {
            name,
            avatar,
            roomId: params.id,
        })


        return (() => socket.disconnect())

    }, [])

    if (!!!players.length) {
        return <></>
    }


    const launchGame = () => {
        setLoading(true);
        if (socketRef.current) {
            socketRef.current.emit('askToStartGame', roomId);
        }
    }

    console.log(players)
    return (
        <AnimatePresence>
            <div className="grow flex items-center justify-center flex-col p-8">
                <div className="flex justify-center gap-4 md:gap-8 lg:gap-10">
                    <Place props={players[0]} />
                    <Place props={players[1]} />
                </div>
                <div className="grid grid-cols-3 w-full grow">
                    <div className=" flex flex-col gap-4 md:gap-8 lg:gap-10 items-end justify-center">
                        <Place props={players[2]} />
                        <Place props={players[4]} />
                    </div>
                    <div className="grid place-items-center">
                        {
                            players[0].id === id ?
                                <button className={`${(loading || players.length < 2) ? "btn-disabled" : "btn-primary"} btn btn-sm md:btn-md lg:btn-lg`} onClick={() => launchGame()}>
                                    {loading ? <div className="loading loading-spinner loading-sm"></div> : "Lancer la partie"}
                                </button>
                                : `${players[0].name} doit lancer la partie `
                        }
                    </div>
                    <div className=" flex flex-col gap-4 md:gap-8 lg:gap-10 items-start justify-center">
                        <Place props={players[3]} />
                        <Place props={players[5]} />
                    </div>
                </div>
                <div className="flex justify-center gap-4 md:gap-8 lg:gap-20">
                    <Place props={players[6]} />
                    <Place props={players[7]} />
                </div>

                <footer className="mt-8">
                    {pathname}
                </footer>
            </div>
        </AnimatePresence>
    );
}

const Place = ({ props }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <span className='w-20 md:w-28 lg:w-40 h-20 md:h-28 lg:h-40 bg-primary/30 rounded-full overflow-hidden'>
                <motion.img
                    key={props?.id}
                    initial={{ y: 22, opacity: 1 }}
                    animate={{ y: 12, opacity: 1 }}
                    exit={{ y: 22, opacity: 0 }} src={stringToAvatar(props?.avatar)} className="" />
            </span>
            <h5>{props?.name}</h5>
        </div>
    )
}
