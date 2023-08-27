import { AiFillYoutube } from 'react-icons/ai'
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
                                <h1 className='text-red-400 font-bold'>We are the Nyori Brothers:</h1>
                                <p>Lidar Nyori and Bomjar Nyori. We're anime enthusiasts (Otakus).
                                    {/* <span>
                                        <GiQueenCrown className='inline text-yellow-500 text-lg ml-1 mr-1' />
                                        <GiIsland className='inline text-white text-lg ml-1 mr-1' />
                                    </span> */}
                                </p>
                            </div>
                            <div className='modal-image-cover mb-2'>
                                <img
                                    className='modal-image-two h-full'
                                    src="/images/Lidar-Bomjar.jpg" alt=""
                                />
                                <a
                                    className='insta-link text-md flex justify-end items-center gap-1 cursor-pointer mr-1'
                                    target='_blank'
                                    href="https://youtube.com/@Lny_editz?feature=share9">
                                    <AiFillYoutube className='text-red-500 text-md shadow-lg font-bold' />
                                    <span className='text-sm'>Subscribe</span>
                                </a>
                            </div>
                        </div>
                        <div className='bottom-part text-left mb-2 mt-1'>
                            <p>
                                <span className='font-bold text-green-400'>Beyond </span>
                                our love for anime, we are enthusiastic technophiles, constantly fueled by curiosity.
                                We enjoy experimenting with new technologies and playing both video games and outdoor games.
                                We developed this web app for all Otakus to find information and watch trailer videos of anime
                                from different seasons. We also made this app for the general population to discover details and watch
                                trailers of movies and TV series.
                            </p>
                            <div className='mb-0 mt-3 flex justify-center'>
                                <img
                                    src="/images/purple-circle.png" alt=""
                                />
                            </div>
                            <p>
                                <span className='font-bold text-red-400'>KaiAnime is </span>
                                developed using Next.js, TypeScript, and Tailwind CSS, leveraging the TMDB API and Jikan REST API.
                            </p>
                            <div className='mb-0 mt-3'>
                                <img
                                    src="/images/Nextjs-logo.png" alt=""
                                />
                            </div>
                            <div className='mt-4 mb-0'>
                                <img
                                    src="/images/Tailwind-logo.png" alt=""
                                />
                            </div>
                            <div className='mt-4 mb-0 flex justify-between gap-4'>
                                <div className=''>
                                    <img
                                        src="/images/Typescript.png" alt=""
                                        height={100} width={200}
                                    />
                                </div>
                                <div className=''>
                                    <img
                                        src="/images/Tmdb.png" alt=""
                                        height={100} width={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTwo