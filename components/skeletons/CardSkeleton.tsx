interface CardSkeletonProps {
    key: any,
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ key }) => {
    return (
        <div className="card pt-3 rounded-lg skeleton mb-2" key={key}>
            <div className="card-skeleton rounded-lg">

            </div>
        </div>
    )
}

export default CardSkeleton