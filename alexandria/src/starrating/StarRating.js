import React, { useState } from 'react'
import Ratings from 'react-ratings-declarative';


const StarRating = () => {

    const [rating, changeRating] = useState(0)

    return (
        <Ratings
            rating={rating}
            widgetRatedColors="blue"
            changeRating={changeRating}
        >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
        </Ratings>
    )

}

export default StarRating