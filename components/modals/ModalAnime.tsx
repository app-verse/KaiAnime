'use client'

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import YouTube from "react-youtube"

interface ModalProps {
    modalState: boolean,
    key: any,
    closeModal: any,
    currentID: any,
    datas: any,
    val: string,
    page_name: string,
    detail: any,
    ytRef: any,
}


const ModalAnime: React.FC<ModalProps> = ({ modalState, closeModal, currentID, datas, val, key, page_name, detail, ytRef }) => {
    const [isVideoPlaying, setVideoPlaying] = useState(false);
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

    // @ts-ignore
    const details = datas?.map(data => {
        const genres = data.genres?.map((genre: any) => {
            return (
                <p key={currentID}>{genre.name}</p>
            )
        })

        const themes = data.themes?.map((theme: any) => {
            return (
                <p key={currentID}>{theme.name}</p>
            )
        })

        let studios: any = []
        if (data.studios && data.studios.length > 0) {
            if (data.studios.length > 1) {
                studios = data.studios.map((studio: any) => {
                    if (data.studios[data.studios.length - 1]['name'] === studio.name) {
                        return (
                            <span key={currentID}>{studio.name}</span>
                        )
                    } else {
                        return (
                            <span key={currentID}>{studio.name}, </span>
                        )
                    }

                })
            } else {
                studios = data.studios.map((studio: any) => {
                    return (
                        <span key={currentID}>{studio.name}</span>
                    )
                })
            }
        }

        let authors: any = []

        if (val === 'top manga') {
            if (data.authors) {
                authors = data.authors.map((author: any) => {
                    return (
                        <p key={currentID}>{author.name}</p>
                    )
                })
            }
        }

        const scoredBy = data.scored_by?.toString()
        let vall: string = '';
        let count = 0;
        for (let i = scoredBy?.length - 1; i >= 0; i--) {
            //const scoredBy = data.scored_by.toString()
            count++
            vall += scoredBy[i]
            if (count === 3 && i > 0) {
                vall += ','
                count = 0
            }
            if (i === 0) {
                let newVall = vall
                vall = ''
                for (let j = newVall.length - 1; j >= 0; j--) {
                    vall += newVall[j]
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

        if (data.mal_id === currentID) {
            //let vote_average = data.vote_average.toFixed(1);
            return (
                <div className='.content-wrapper' key={currentID}>
                    <div className="modal-heading">
                        <div className='mr-5'>{data.title}</div>
                        <div className='close-btn cursor-pointer' onClick={closeModal}>X</div>
                    </div>
                    <div className='modal-body'>
                        <div className=''>
                            <div className='movie-description text-left'>
                                {data.score ?
                                    <p>
                                        <span className='font-bold'>Rating: </span>
                                        {data.score} {`(${vall})`}
                                    </p> :
                                    <p>
                                        <span className='font-bold text-blue-400'>Rating: </span>
                                        No rating yet
                                    </p>
                                }
                                <p><span className='font-bold'>Status:</span> {data.status}</p>
                                {data.studios && data.studios.length > 0 ?
                                    <p><span className='font-bold text-red-400'>Studios:</span> {studios}</p> :
                                    null
                                }
                            </div>
                            {/* <div className='modal-image-cover'>
                                <img
                                    className='modal-image'
                                    src={data.images.jpg.large_image_url} alt=""
                                />
                            </div> */}
                        </div>
                        <div className='text-left'>
                            {data.trailer &&
                                <div className="rounded-sm">
                                    <span className='font-bold text-green-400'>Trailer video: </span>
                                    <div className={`youtube-container skeleton-two`}>
                                        <YouTube
                                            className="rounded-lg"
                                            opts={opts}
                                            videoId={data.trailer.youtube_id}
                                            onPlay={() => { setVideoPlaying(true) }}
                                            onPause={() => { setVideoPlaying(false) }}
                                            ref={ytRef}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                data.duration &&
                                <p className="capitalize mt-2">
                                    <span className='font-bold'>Duration: </span>
                                    {data.duration !== 'Unknown' ? data.duration + 'isode' : data.duration}
                                </p>
                            }
                            {
                                data.published &&
                                <p className="capitalize"><span className='font-bold'>
                                    Published:</span> {data.published.string}
                                </p>
                            }
                            <div className="flex gap-x-5 flex-wrap gap-y-1">
                                {
                                    data.season &&
                                    <p className="capitalize"><span className='font-bold'>Season:</span> {data.season},</p>
                                }
                                <p><span className='font-bold'>Type:</span> {data.type},</p>
                                {
                                    data.episodes &&
                                    <p><span className='font-bold'>Episodes:</span> {data.episodes},</p>
                                }
                                {
                                    data.source &&
                                    <p><span className='font-bold'>Source:</span> {data.source},</p>
                                }
                                {
                                    data.chapters &&
                                    <p><span className='font-bold'>Chapters:</span> {data.chapters},</p>
                                }
                                {
                                    val === 'top manga' &&
                                    <p><span className='font-bold'>Rank:</span> {data.rank},</p>
                                }
                            </div>
                            {
                                val === 'top manga' &&
                                <div>
                                    <p className='font-bold underline'>Authors:</p>
                                    <div className='ml-2'>
                                        <div>
                                            {authors}
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                genres || themes ?
                                    <div className="flex justify-start items-start gap-10 flex-wrap">
                                        <div>
                                            <p className='font-bold text-blue-400 underline'>Genres:</p>
                                            <div className='ml-2'>
                                                <div>
                                                    {genres.slice(0, 3)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='font-bold text-red-400 underline'>Themes:</p>
                                            <div className='ml-2'>
                                                <div>
                                                    {themes.slice(0, 3)}
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null
                            }
                        </div>
                        {/* <div className='modal-image-cover'>
                                <img
                                    className='modal-image'
                                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt=""
                                />
                            </div> */}
                        <div className='bottom-part text-left mt-2'>
                            {data.year &&
                                <p><span className='font-bold'>Year:</span> {data.year}</p>
                            }
                            {
                                val === 'top manga' &&
                                <p>
                                    <span className='font-bold'>My Anime List Link: </span>
                                    <Link href={data.url} target="_blank" className="underline text-blue-400">Click to visit</Link>
                                </p>
                            }
                            <p>
                                <span className='font-bold text-green-400'>Synopsis: </span> {data.synopsis}
                            </p>
                            <p className="mt-1 font-bold text-red-400">Image: </p>
                            <div className='mt-2 mb-5 flex flex-col gap-2'>
                                <img
                                    className='rounded-lg'
                                    src={data.images.jpg.large_image_url} alt=""
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
            <div className="modal rounded-lg py-6" ref={modalRef}>
                {details}
            </div>
        </div>
    )
}

export default ModalAnime