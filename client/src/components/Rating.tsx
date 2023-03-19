import React, {FC} from 'react';
import bigStar from "../assets/bigStar.png";

interface RatingProps {
    rating: number
}

const Rating:FC<RatingProps> = ({rating}) => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: "5rem",
                height: "5rem",
                backgroundSize: 'cover',
                fontSize: "2rem"
            }}
        >
            {rating}
        </div>
    );
};

export default Rating;