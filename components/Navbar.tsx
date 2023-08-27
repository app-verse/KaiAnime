'use client'
import { useState } from "react"
import ModalTwo from "./modals/ModalTwo"
export default function Navbar() {
    const [greet, setGreet] = useState(false)
    function greetings() {
        setGreet(prevState => !prevState)
    }
    return (
        <>
            <nav className="w-full bg-gray-950 py-3 px-4 md:px-8 pt-5 border-none flex justify-center items-center">
                <div className='logo-container absolute md:relative'>
                    <h1 className='logo-main'>DhakarFlix</h1>
                </div>
                <div className='greet cursor-pointer ml-auto' onClick={greetings}>
                    Hi ✋🏻
                </div>
            </nav>
            <ModalTwo greet={greet} greetings={greetings} />
        </>
    )
}