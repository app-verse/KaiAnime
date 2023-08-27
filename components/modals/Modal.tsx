'use client'

import { useEffect, useState, useRef } from 'react'
import { ReactNode } from "react"
import YouTube from "react-youtube"
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface ModalProps {
    modalState: boolean,
    key: any,
    closeModal: any,
    currentID: any,
    movies: any,
    val: string,
    page_name: string,
    youtubeID: any,
    ytRef: any,
    cast: any,
    details: any,
}


const Modal: React.FC<ModalProps> = (
    {
        modalState, closeModal, currentID, movies, val, key, page_name, youtubeID, ytRef, cast, details,
    }
) => {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            // @ts-ignore
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal()
            }
        };

        if (modalState) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [modalState]);

    const [isVideoPlaying, setVideoPlaying] = useState(false);

    const genres = details.genres?.map((genre: any) => {
        return (
            <p key={currentID}>{genre.name}</p>
        )
    })

    const castNames = cast?.map((name: any) => {
        return (
            <p key={currentID}>{name.name}</p>
        )
    })

    let language: string;
    const languages: string[] = ['English', 'Japanese', 'Hindi', 'Korean', 'German', 'French', 'Russian', 'Italian',
        'Arabic', 'Chinese', 'Turkish', 'Spanish', 'Portuguese', 'Dutch', 'Vietnamese', 'Filipino', 'Urdu', 'Swedish',
        'Romanian', 'Catalan', 'Ukrainian', 'Polish', 'Tamil', 'Czech', 'Malay', 'Thai', 'Tagalog']

    const languageAbr: string[] = ['en', 'ja', 'hi', 'ko', 'de', 'fr', 'ru', 'it',
        'ar', 'zh', 'tr', 'es', 'pt', 'nl', 'vi', 'fil', 'ur', 'sv',
        'ro', 'ca', 'uk', 'pl', 'ta', 'cs', 'ms', 'th', 'tl']

    for (let i = 0; i < languages.length; i++) {
        if (details.original_language === languageAbr[i]) {
            language = languages[i]
            break
        } else {
            language = details.original_language
        }
    }

    let yID: string;
    if (youtubeID) {
        for (const item of youtubeID) {
            if (item.name === 'Official Trailer') {
                yID = item.key
                break
            } else if (item.name === 'Teaser Trailer') {
                yID = item.key
                break
            } else {
                yID = item.key
            }
        }
    }

    const opts = {
        height: '274',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // @ts-ignore
    const content = movies.map(movie => {
        if (movie.id === currentID) {
            let vote_average = movie.vote_average.toFixed(1);
            return (
                <div className='.content-wrapper' key={currentID}>
                    <div className="modal-heading">
                        <div className='mr-5'>{page_name === 'tv-series' ? movie.name : movie.title}</div>
                        <div className='close-btn cursor-pointer' onClick={closeModal}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className=''>
                            <div className='movie-description text-left'>
                                <h1><span className='font-bold'>Vote Average:</span> {vote_average}</h1>
                                <p><span className='font-bold'>Status:</span> {details.status}</p>
                                <p>
                                    <span className='font-bold'>
                                        {page_name === 'tv-series' ? 'First Air Date: ' : 'Releasse Date: '}
                                    </span>
                                    {page_name === 'tv-series' ? movie.first_air_date : movie.release_date}
                                </p>
                            </div>
                            {/* <div className='modal-image-cover'>
                                    <img
                                        className='modal-image'
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
                                    />
                                </div> */}
                        </div>
                        <div className="rounded-sm text-left">
                            <span className='font-bold text-green-400'>Trailer video: </span>
                            <div className={`youtube-container skeleton-two`}>
                                <YouTube
                                    className="rounded-lg"
                                    opts={opts}
                                    videoId={yID ? yID : 'Not Available'}
                                    onPlay={() => { setVideoPlaying(true) }}
                                    onPause={() => { setVideoPlaying(false) }}
                                    ref={ytRef}
                                />
                            </div>
                        </div>
                        <div className='bottom-part text-left mt-2'>
                            <p><span className='font-bold'>Original Language:</span> {language}</p>
                            {
                                genres || castNames ?
                                    <div className="flex justify-start items-start gap-8 flex-wrap mb-1">
                                        <div>
                                            <p className='font-bold text-red-400 underline'>Casts:</p>
                                            <div className='ml-2'>
                                                <div>
                                                    {castNames ? castNames.slice(0, 4) : castNames}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='font-bold text-blue-400 underline'>Genres:</p>
                                            <div className='ml-2'>
                                                <div>
                                                    {genres ? genres.slice(0, 4) : genres}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div>
                                                <p className='font-bold text-red-400 underline'>Themes:</p>
                                                <div className='ml-2'>
                                                    <div>
                                                        {themes.slice(0, 3)}
                                                    </div>
                                                </div>
                                            </div> */}
                                    </div> : null
                            }
                            <p>
                                <span className='font-bold text-green-400'>Overview:</span> {movie.overview}
                            </p>
                            <div className='mt-1 mb-5'>
                                <p className="font-bold text-red-400 mb-1">Image: </p>
                                <img
                                    className='rounded-lg'
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    )

    return (
        <div
            className={`modal-blur inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center
                        ${modalState ? "fix-modal" : "hidden"} flex-wrap`}
        >
            <div className="modal rounded-lg py-6" ref={modalRef} >
                {content}
            </div>
        </div>
    )
}

export default Modal