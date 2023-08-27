import { FaInstagram } from 'react-icons/fa'
import { GiQueenCrown } from 'react-icons/gi'
import { GiIsland } from 'react-icons/gi'
import { useRef, useEffect } from 'react'

interface ModalTwoProps {
    greet: boolean,
    greetings: any,
}

const ModalTwo: React.FC<ModalTwoProps> = ({ greet, greetings }) => {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            // @ts-ignore
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                greetings()
            }
        };

        if (greet) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [greet]);

    return (
        <div
            className={`modal-blur inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center
                        ${greet ? "fix-modal" : "hidden"} flex-wrap z-50`}
        >
            <div className="modal rounded-lg py-16 pb-0 pt-8" ref={modalRef} >
                <div className='.content-wrapper'>
                    <div className="modal-heading">
                        <div className='mr-5'></div>
                        <div className='close-btn cursor-pointer' onClick={greetings}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className='details-two'>
                            <div className='movie-description text-left'>
                                <h1 className='text-red-400 font-bold'>I am Dhakarsum,</h1>
                                <p>affectionately known as Moi Sum, and I hold the esteemed title of the queen of Motunui.
                                    <span>
                                        <GiQueenCrown className='inline text-yellow-500 text-lg ml-1 mr-1' />
                                        <GiIsland className='inline text-white text-lg ml-1 mr-1' />
                                    </span>
                                </p>
                            </div>
                            <div className='modal-image-cover mb-2'>
                                <img
                                    className='modal-image-two h-full'
                                    src="/images/geyii2.jpg" alt=""
                                />
                                <a
                                    className='insta-link text-md flex justify-end items-center gap-1 cursor-pointer mr-1'
                                    target='_blank'
                                    href="https://www.instagram.com/meformusic8/">
                                    <FaInstagram className='text-pink-600 text-md shadow-lg font-bold' />
                                    <span className='text-sm'>Follow</span>
                                </a>
                            </div>
                        </div>
                        <div className='bottom-part text-left mb-0 mt-1'>
                            <p>
                                <span className='font-bold text-green-400'>Within this enchanting </span>
                                realm of Motunui, exists an extraordinary platform that caters to your cinematic cravings.
                                <span className='font-bold text-red-400'> Behold DhakarFlix, </span>
                                a haven of cinematic wonders nestled within the embrace of Motunui. DhakarFlix offers a
                                treasure trove of knowledge, resenting you with meticulously curated information and immersive
                                trailer videos. DhakarFlix promises to be your ultimate companion, guiding you through the realm
                                of Movies, Anime, and TV series with the utmost grace and style.
                            </p>
                            <div className='mb-0 mt-3 flex justify-center'>
                                <img
                                    src="/images/purple-circle.png" alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTwo