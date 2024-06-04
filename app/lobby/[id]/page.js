"use client";
import { useStore } from "@/store/player";
import { useStoreRoom } from "@/store/room";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import socketIO from 'socket.io-client';
export default function page({ params }) {
    const { name, avatar, setRoomId, setIsJoining } = useStore();
    const { players, updatePlayers } = useStoreRoom();

    const router = useRouter();

    useEffect(() => {

        // Si tu n'as pas de nom c'est que tu join, on te redirige sur la home avec indication
        if (!!!name) {
            setIsJoining(true)
            setRoomId(params.id)
            router.push('/');
            return;
        }

        const socket = socketIO.connect('http://localhost:4000');

        socket.on('roomUsers', (data) => {
            updatePlayers(data)
        });


        socket.on('userDisconnected', data => {
            updatePlayers(data)
        })

        socket.emit('joinRoom', {
            name,
            avatar,
            roomId: params.id,
        })

        return (() => socket.disconnect())

    }, [])



    console.log(players)
    return (
        <div>
            {
                players.map((el, i) => <div key={i}>{el.name}</div>)
            }
            {params.id}
        </div>
    );
}
