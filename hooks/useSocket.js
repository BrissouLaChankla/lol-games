import { useEffect, useRef } from 'react';
import socketIO from 'socket.io-client';

const useSocket = (url, options = {}) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = socketIO.connect(url, options);
        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [url, options]);

    return socketRef.current;
};

export default useSocket;
