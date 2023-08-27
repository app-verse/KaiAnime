'use client'
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Cards from "./Cards";
import { nanoid } from "nanoid"
import ScaleLoader from "react-spinners/ScaleLoader";
import Footer from "../Footer";
import Link from "next/link";
import { MdOutlineLocalMovies } from 'react-icons/md'
import { PiTelevisionSimpleBold } from 'react-icons/pi'
import { SiMyanimelist } from 'react-icons/si'
import ModalAnime from "../modals/ModalAnime";
import { FaSuperpowers } from 'react-icons/fa'
import CardSkeleton from "../skeletons/CardSkeleton";

export default function MainLayoutTwo({ page_name }: { page_name: string }) {
    const [val, setVal] = useState('current season');
    const [mirrorVal, setMirrorVal] = useState('Current Season');
    const [data, setData] = useState([]);
    const [isSticky, setIsSticky] = useState(false)
    const [loading, setLoading] = useState(false)
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [modalState, setModalState] = useState(false)
    const [details, setDetails] = useState([])
    const [currentID, setCurrentID] = useState()
    const youtubeRef = useRef(null);
    const currentYear = new Date().getFullYear();
    const [pageName, setPageName] = useState(page_name)

    useEffect(() => {
        try {
            toast.promise(
                // axios.get('/api/get/', { params: { val } })
                //     .then(res => {
                //         setData(res.data)
                //         setLoading(false)
                //         scrollToTop()
                //     }),
                workingWithData(),
                {
                    loading: 'Unlocking the Anime Vault...',
                    success: <b className="capitalize">{mirrorVal}</b>,
                    error: <b>Server Error: 🥺 Please refresh the page and try again.</b>,
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#1D202A',
                        color: '#CBD5E1',
                        zIndex: 100,
                    },
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 6000,
                    },
                }
            );
        } catch (error: any) {
            toast.error("This didn't work.", {
                duration: 2000,
            })
        }
    }, [val])

    useEffect(() => {

    }, [currentID])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 100; // Adjust this value as needed

            if (scrollTop > threshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [])

    async function workingWithData() {
        setSkeletonLoading(true)
        if (val === 'top anime') {
            const result = await fetch(`https://api.jikan.moe/v4/top/anime?limit=24`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === 'top manga') {
            const result = await fetch(`https://api.jikan.moe/v4/top/manga`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === 'upcoming season') {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?limit=24`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === `season winter ${currentYear}`) {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/winter`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === `season spring ${currentYear}`) {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/spring`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === `season summer ${currentYear}`) {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/summer`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === `season fall ${currentYear}`) {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear}/fall`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else if (val === `season winter ${currentYear + 1}`) {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/${currentYear + 1}/winter`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        } else {
            const result = await fetch(`https://api.jikan.moe/v4/seasons/now?limit=24`)
                .then(res => res.json())
                .then(data => {
                    setData(data.data)
                    setSkeletonLoading(false)
                    scrollToTop()
                })
        }
    }

    function changeCategory(event: any) {
        const eVal = event.target.value
        setVal(eVal)
        if (eVal === 'top anime') {
            setMirrorVal('top anime')
        } else if (eVal === `season winter ${currentYear}`) {
            setMirrorVal(`season winter: ${currentYear}`)
        } else if (eVal === `season spring ${currentYear}`) {
            setMirrorVal(`season spring: ${currentYear}`)
        } else if (eVal === `season summer ${currentYear}`) {
            setMirrorVal(`season summer: ${currentYear}`)
        } else if (eVal === `season fall ${currentYear}`) {
            setMirrorVal(`season fall: ${currentYear}`)
        } else if (eVal === `season winter ${currentYear + 1}`) {
            setMirrorVal(`season winter: ${currentYear + 1}`)
        } else {
            setMirrorVal(eVal)
        }
    }

    function changeModal(event: any, id: any) {
        setModalState(true)
        setCurrentID(id)
    }

    function closeModal(event: any) {
        setModalState(false)
        if (youtubeRef.current) {
            // @ts-ignore
            youtubeRef.current.getInternalPlayer().pauseVideo();
        }
    }

    function tabLoading(e: any) {
        const clickedLink = e.currentTarget; // Get the clicked link element
        const linkId = clickedLink.id; // Get the id attribute of the clicked link
        // This prevents loader from loading if the button for same page is Clicked
        if (page_name === 'anime' && linkId === 'linkAnime') {
            setSkeletonLoading(false)
        } else {
            setSkeletonLoading(true)
        }

        // Changes the page name
        if (linkId === 'linkMovie') {
            setPageName('movies')
        }

        if (linkId === 'linkTv') {
            setPageName('tv-series')
        }

        if (linkId === 'linkAnime') {
            setPageName('anime')
        }
    }

    const scrollToTop = () => {
        const duration = 1000; // Adjust the duration of the scroll animation
        const startTime = performance.now();
        const startPosition = window.pageYOffset;

        const easingFunction = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunction(progress);
            const newPosition = startPosition + (0 - startPosition) * easedProgress;

            window.scrollTo(0, newPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    let cardSkeleton: any = [];
    for (let i = 0; i < 20; i++) {
        cardSkeleton.push(<CardSkeleton key={nanoid()} />)
    }

    const movieData = data.map(item => {
        return (
            <Cards
                page_name={pageName}
                id={item['mal_id']}
                key={item['mal_id']}
                title={val === 'characters' ? item['name'] : item['title']}
                poster_path={item['images']}
                changeModal={changeModal}
            />
        )
    })

    return (
        <div className="flex flex-col justify-center items-center">
            {
                loading &&
                <div className='modal-blur inset-0 bg-black bg-opacity-30
                        flex justify-center items-center fixed flex-wrap transition duration-150 ease-out z-50'>
                    <ScaleLoader
                        color={"#1FDF64"}
                        loading={loading}
                        // @ts-ignore
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

            }
            {
                skeletonLoading &&
                <div className='modal-blur inset-0 bg-black bg-opacity-20
                        flex justify-center items-center fixed flex-wrap transition duration-150 ease-out z-50'>
                    <ScaleLoader
                        color={"#1FDF64"}
                        loading={loading}
                        // @ts-ignore
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
            <div className="grid grid-cols-3 gap-3 md:gap-4">
                <Link
                    className={`${pageName === 'movies' && 'border-b-[1px] border-slate-300'} text-center
                                  flex justify-center items-center gap-1 px-2 py-1
                                hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/' onClick={tabLoading} id="linkMovie">
                    <MdOutlineLocalMovies className='text-green-400' />
                    <div>Movies</div>
                </Link>
                <Link
                    className={`${pageName === 'tv-series' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/tv-series' onClick={tabLoading} id="linkTv" >
                    <PiTelevisionSimpleBold className='text-red-400' />
                    <div>TV Series</div>
                </Link>
                <Link
                    className={`${pageName === 'anime' && 'border-b-[1px] border-slate-300'} text-center
                                    flex justify-center items-center gap-1 px-2 py-1
                                  hover:bg-slate-700 hover:rounded-lg transition duration-300 ease-out`}
                    href='/anime' onClick={tabLoading} id="linkAnime" >
                    <FaSuperpowers className='text-blue-400' />
                    <div>Anime</div>
                </Link>
            </div>
            <div className={`sorting-nav my-6 ml-2 flex gap-2 items-center ${isSticky ? 'fixed-nav' : ''}`}>
                <h1>Sort:</h1>
                <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                    name="categories" id="" value={val} onChange={changeCategory}>
                    <option value="current season">Current Season</option>
                    <option value="upcoming season">Upcoming Season</option>
                    <option value={`season winter ${currentYear}`}>Season: Winter</option>
                    <option value={`season spring ${currentYear}`}>Season: Spring</option>
                    <option value={`season summer ${currentYear}`}>Season: Summer</option>
                    <option value={`season fall ${currentYear}`}>Season: Fall</option>
                    <option value={`season winter ${currentYear + 1}`}>Season: Winter {currentYear + 1}</option>
                    <option value="top anime">Top Anime</option>
                    <option value="top manga">Top Manga</option>
                </select>
            </div>
            <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 px-2 md:px-6 lg:px-12
                            ${skeletonLoading && 'mt-2'}`}>
                {skeletonLoading ? cardSkeleton : movieData}
            </div>
            <Toaster />
            <ModalAnime
                ytRef={youtubeRef}
                datas={data} detail={details} currentID={currentID}
                modalState={modalState} closeModal={closeModal}
                val={val} page_name={pageName}
                key={currentID}
            />
            <Footer />
        </div>
    )
}