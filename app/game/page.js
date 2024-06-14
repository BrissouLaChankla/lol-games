"use client"

import { useEffect, useState, useRef } from "react"
import { useSocketStore } from '@/store/useSocketStore';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/player';
import { useStoreRoom } from '@/store/room';
import Leaderboard from "@/components/Leaderboard";
import { compareAnswers } from "@/utils/game";

export default function page() {
    const router = useRouter();
    const { socket } = useSocketStore();
    const { roomId, id } = useStore();
    const { updatePlayers } = useStoreRoom();

    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [questionTime, setQuestionTime] = useState(0)
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [scores, setScores] = useState([]);
    const [isFreezed, setIsFreezed] = useState(false);
    const [timeReceivedQuestion, setTimeReceivedQuestion] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [asAnswered, setAsAnswered] = useState(false);

    const [progress, setProgress] = useState(0)


    const answerRef = useRef(null)
    const modalRef = useRef(null)

    useEffect(() => {

        let incrementProgress;


        // Uniquement le Host lance la partie 
        // if (players[0].id === id) {
        socket.emit('gameStarting', roomId);
        // }


        socket.on('transitionQuestion', () => {
            setTimeout(() => {
                setProgress(0);
                incrementProgress = setInterval(() => {
                    setProgress(prevCount => prevCount + 1);
                }, 41);
                modalRef.current.showModal();
            }, 1000)
        })

        socket.on('launchQuestion', data => {
            answerRef.current.value = "";
            clearInterval(incrementProgress)
            modalRef.current.close();
            setAsAnswered(false)

            setCorrectAnswer(data.question.good_answer)
            setContent(data.question.content)
            setCategory(data.question.category.name)
            setTimeReceivedQuestion(Date.now())
            setQuestionTime(data.question.category.time)
            setCategoryQuestion(data.question.category.question)
            setScores(data.scores)
        });


        socket.on('endGame', scores => {
            updatePlayers(scores);
            router.push('/end');
        })




        const decrementTimer = setInterval(() => {
            setQuestionTime(prevCount => prevCount - 1);
        }, 1000);


        return () => {
            clearInterval(decrementTimer);
        };

    }, [])

    const handleAnswer = e => {
        e.preventDefault();
        console.log(answerRef.current.value)
        console.log(correctAnswer)
        if (compareAnswers(answerRef.current.value, correctAnswer)) {
            socket.emit('sendAnswer', { playerId: id, roomId, speed: 150 - Math.floor((Date.now() - timeReceivedQuestion) / 100) })
            setAsAnswered(true)
        } else {
            setIsFreezed(true);
            setTimeout(() => {
                setIsFreezed(false);
                answerRef.current.value = ""
            }, 1000)
        }
    }

    useEffect(() => {
        if (!isFreezed && !asAnswered) {
            answerRef.current.focus();
        }
    }, [isFreezed, asAnswered]);


    return (
        <div className="grid grid-cols-12 grow">
            <div className="col-span-9 lg:p-10 flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="badge badge-primary">{category}</div>
                    <span className="countdown font-mono text-6xl">
                        <span style={{ "--value": questionTime }}></span>
                    </span>
                </div>
                <div className="grow flex flex-col items-center justify-center gap-8">
                    <div className="text-4xl">
                        {content}
                    </div>
                    <h1 className="text-center">{categoryQuestion}</h1>
                </div>
                <form className="text-center pb-10 pt-6 " onSubmit={(e) => handleAnswer(e)}  >

                    <input type="text" disabled={asAnswered || isFreezed} ref={answerRef} placeholder={asAnswered ? `Bravo, c'était bien ${correctAnswer} !` : "..."} autoFocus className={`input  input-bordered text-center input-lg w-full max-w-lg ${isFreezed ? "ring-2 ring-error shake" : asAnswered ? "ring-2 ring-success" : ""}`} />
                    {/* <button type="submit" className={`btn ${isFreezed ? "btn-error" : asAnswered ? "btn-success " : "btn-primary"} btn-lg rounded-l-none`}>Primary</button> */}
                </form>
            </div>

            <div className="col-span-3 border-l-2 px-2 overflow-x-hidden">
                <h2 className="text-center">Classement</h2>
                <Leaderboard scores={scores} />
            </div>

            <dialog className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center">Temps écoulé ⏱️</h3>
                    <p className="py-4">La bonne réponse était <strong className="text-primary"> {correctAnswer}</strong></p>
                    <p className="py-4">Préparez-vous pour la prochaine question...</p>
                    <progress className="progress progress-primary w-full" value={progress} max="100"></progress>
                </div>
            </dialog>
        </div>
    )
}
