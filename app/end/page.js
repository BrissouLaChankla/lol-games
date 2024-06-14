"use client"
import { useStoreRoom } from '@/store/room';
import Leaderboard from '@/components/Leaderboard';

export default function page() {
    const { players } = useStoreRoom();
    console.log(players)
    return (
        <div>
            <h1 className='text-center mt-20'>Classement final</h1>
            <div className='mt-20 grid grid-cols-3 max-w-screen-md m-auto '>
                <div>
                    <div className='text-center relative translate-y-20'>
                        <div className='text-5xl absolute left-1/2 bottom-1/3  -translate-x-1/2 z-10'>🥈</div>
                        <div className="avatar">
                            <div className="w-32 mask mask-squircle">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <h2 className='text-4xl'>Bricekodp</h2>
                    </div>
                </div>
                <div className='text-center relative'>
                    <div className='text-7xl absolute left-1/2 -top-12 -rotate-12 -translate-x-1/2 z-10'>👑</div>
                    <div className="avatar">
                        <div className="w-40 mask mask-squircle">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <h2 className='text-5xl font-bold'>Bricekodp</h2>
                </div>
                <div>
                    <div className='text-center relative translate-y-28'>
                        <div className='text-4xl absolute left-1/2 bottom-1/3 -translate-x-1/2 z-10'>🥉</div>
                        <div className="avatar">
                            <div className="w-24 mask mask-squircle">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <h2 className='text-2xl'>Bricekodp</h2>
                    </div>
                </div>
            </div>
            <div className='h-24 bg-red-200 w-full max-w-screen-md m-auto mt-20'>
                <Leaderboard scores={players} />
            </div>
        </div>
    )
}
