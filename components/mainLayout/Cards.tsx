'use client'
import Image from "next/image"

interface CardsProps {
    id: any,
    key: any,
    title: string,
    poster_path: any,
    changeModal: any,
    page_name: string,
}

const Cards: React.FC<CardsProps> = ({
    id,
    key,
    title,
    poster_path,
    changeModal,
    page_name,
}) => {
    const imagePath = 'https://image.tmdb.org/t/p/original';
    const poster = page_name === 'anime' ? poster_path.jpg.image_url : imagePath + poster_path;

    //<img src={`https://image.tmdb.org/t/p/original${poster}`} width={400} height={400} />
    return (
        <div className="card rounded-lg pt-3" key={key}>
            <h4
                className="card-title rounded-t-lg text-sm lg:text-[0.95rem] font-bold cursor-pointer px-2 pb-2 truncate ..."
                onClick={(event) => changeModal(event, id)}>
                {title}
            </h4>
            <div className="cursor-pointer" onClick={(event) => changeModal(event, id)}>
                <Image
                    className={`${page_name === 'anime' ? 'card-image-two' : 'card-image'} rounded-lg skeleton-two`}
                    src={poster} width={400} height={400} alt="poster"
                />
            </div>
        </div>
    )
}

export default Cards