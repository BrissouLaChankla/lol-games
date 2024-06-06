"use client"

import { useEffect } from "react"

export default function page() {
    useEffect(() => {

    }, [])
    return (
        <div className="grid grid-cols-12 grow">
            <div className="col-span-9 lg:p-10 flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="badge badge-primary">Category</div>
                    <span className="countdown font-mono text-6xl">
                        <span style={{ "--value": 52 }}></span>
                    </span>
                </div>
                <div className="grow flex flex-col items-center justify-center  gap-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className="w-1/4 rounded-2xl" />

                    <h1 className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit ?!</h1>
                </div>
                <div className="text-center pb-10 pt-6">
                    <input type="text" placeholder="Ta réponse" autoFocus className="input input-bordered input-lg w-full max-w-lg" />
                </div>
            </div>





            <div className="col-span-3 border-l-2 px-2">
                <h2 className="text-center">Classement</h2>
                <div className="border-[2px] border-primary rounded-full px-1 py-0.5 flex items-center my-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full  ring-2 ring-primary ring-offset-base-100 ring-offset-4">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center grow px-4">
                        <h3 className="text-lg font-medium ">Brice</h3>
                        <span className="text-primary font-medium">84530</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
