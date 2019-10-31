import React, { useState } from 'react'
import Ratings from 'react-ratings-declarative';


const StarRating = (props) => {

    // const [rating, changeRating] = useState(0)

    const myChangeRating = (newRating) => {
        props.changeRating(newRating)
    }

    return (
        <Ratings
            rating={props.rating}
            widgetRatedColors="blue"
            changeRating={myChangeRating}
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