'use client'
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Cards from "./Cards";
import ScaleLoader from "react-spinners/ScaleLoader";
import { nanoid } from "nanoid"
import Modal from "../modals/Modal";
import Footer from "../Footer";
import Link from "next/link";
import { MdOutlineLocalMovies } from 'react-icons/md'
import { PiTelevisionSimpleBold } from 'react-icons/pi'
import { SiMyanimelist } from 'react-icons/si'
import { FaSuperpowers } from 'react-icons/fa'
import CardSkeleton from "../skeletons/CardSkeleton";

export default function MainLayout({ page_name }: { page_name: string }) {
    const mValue = page_name === 'movies' ? 'trending (movies)' : 'trending (tv series)';
    const [val, setVal] = useState('trending');
    const [mirrorVal, setMirrorVal] = useState(mValue);
    const [data, setData] = useState([]);
    const [isSticky, setIsSticky] = useState(false)
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [details, setDetails] = useState([])
    const [currentID, setCurrentID] = useState()
    const [youtubeID, setYoutubeID] = useState()
    const [cast, setCast] = useState()
    const [pageName, setPageName] = useState(page_name)
    const youtubeRef = useRef(null);
    const API_KEY = "a811bdebd1c0a1dc607c1341bd023aa9"

    useEffect(() => {
        setSkeletonLoading(true)
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
                    loading: 'Lights, Camera, Loading...',
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
                        duration: 5000,
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
        setLoading(true)
        // axios.get('/api/get/', { params: { currentID, val } })
        //     .then(res => {
        //         setGenres(res.data)
        //         setLoading(false)
        //     })
        if (page_name === 'tv-series') {
            fetch(`https://api.themoviedb.org/3/tv/${currentID}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setDetails(data)
                    setLoading(false)
                })

            fetch(`https://api.themoviedb.org/3/tv/${currentID}/videos?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setYoutubeID(data.results)
                    console.log(data.result)
                    setLoading(false)
                })

            fetch(`https://api.themoviedb.org/3/tv/${currentID}/credits?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setCast(data.cast)
                    setLoading(false)
                })
        } else {
            fetch(`https://api.themoviedb.org/3/movie/${currentID}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setDetails(data)
                    setLoading(false)
                })

            fetch(`https://api.themoviedb.org/3/movie/${currentID}/videos?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setYoutubeID(data.results)
                    setLoading(false)
                })

            fetch(`https://api.themoviedb.org/3/movie/${currentID}/credits?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setCast(data.cast)
                    setLoading(false)
                })
        }
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
        scrollToTop()
        if (page_name === 'movies') {
            if (val === 'trending') {
                const result = await fetch(`https://api.themoviedb.org/3/${val}/movie/day?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        setData(data.results)
                        setSkeletonLoading(false)
                        scrollToTop()
                    })
            } else {
                const result = await fetch(`https://api.themoviedb.org/3/movie/${val}?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        setData(data.results)
                        setSkeletonLoading(false)
                        scrollToTop()
                    })
            }
        } else {
            if (val === 'trending') {
                const result = await fetch(`https://api.themoviedb.org/3/${val}/tv/day?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        setData(data.results)
                        setSkeletonLoading(false)
                        scrollToTop()
                    })
            } else {
                const result = await fetch(`https://api.themoviedb.org/3/tv/${val}?api_key=${API_KEY}&language=en-US&sort_by=popularity`)
                    .then(res => res.json())
                    .then(data => {
                        setData(data.results)
                        setSkeletonLoading(false)
                        scrollToTop()
                    })
            }

        }
    }

    function changeCategory(event: any) {
        const eVal = event.target.value
        setVal(eVal)
        if (page_name === 'movies') {
            if (eVal === 'top_rated') {
                setMirrorVal('top rated movies')
            } else if (eVal === 'now_playing') {
                setMirrorVal('now playing (movies)')
            } else {
                setMirrorVal(eVal + ' movies')
            }
        } else {
            if (eVal === 'top_rated') {
                setMirrorVal('top rated tv series')
            } else if (eVal === 'now_playing') {
                setMirrorVal('now playing (tv series)')
            } else if (eVal === 'on_the_air') {
                setMirrorVal('on the air (tv series)')
            } else {
                setMirrorVal(eVal + ' tv series')
            }
        }
    }

    function changeModal(event: any, id: any) {
        console.log('Change Modal cliked')
        setCurrentID(id)
        setModalState(true)
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
        if (page_name === 'movies' && linkId === 'linkMovie') {
            setSkeletonLoading(false)
        } else if (page_name === 'tv-series' && linkId === 'linkTv') {
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
                id={item['id']}
                key={item['id']}
                title={page_name === 'tv-series' ? item['name'] : item['title']}
                poster_path={item['poster_path']}
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
                                    flex justify-center items-center gap-1 px-2 py-1 focus:border-b-[1px]
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
            <div className={`sorting-nav my-6 ml-2 flex gap-2 items-center 
                            ${isSticky ? 'fixed-nav' : ''}`}>
                <h1>Sort:</h1>
                {pageName === 'movies' ?
                    <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                        name="categories" id="" value={val} onChange={changeCategory}>
                        <option value="trending">Trending</option>
                        <option value="top_rated">Top Rated</option>
                        <option value="popular">Popular</option>
                        <option value="now_playing">Now Playing</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                    :
                    <select className='font-Nunito p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#ffffff33]'
                        name="categories" id="" value={val} onChange={changeCategory}>
                        <option value="trending">Trending</option>
                        <option value="top_rated">Top Rated</option>
                        <option value="popular">Popular</option>
                        <option value="on_the_air">On the Air</option>
                    </select>
                }
            </div>
            <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 px-2 md:px-6 lg:px-12
                            ${skeletonLoading && 'mt-2'}`}>
                {skeletonLoading ? cardSkeleton : movieData}
            </div>
            <Toaster />
            <Modal
                movies={data} currentID={currentID}
                modalState={modalState} closeModal={closeModal}
                val={val} page_name={pageName}
                details={details}
                key={currentID}
                youtubeID={youtubeID} ytRef={youtubeRef} cast={cast}
            />
            <Footer />
        </div>
    )
}