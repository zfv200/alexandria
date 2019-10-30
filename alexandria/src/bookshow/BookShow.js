import React, { useState } from 'react'
import { graphql } from 'react-apollo'

import { Link } from 'react-router-dom'

import { getSingleBook } from '../queries/index'

import Review from '../review/Review'
import CreateReview from '../createreview/CreateReview'

const BookShow = (props) => {

    const { id } = props.match.params
    
    const [reviewing, toggleReviewing] = useState(false)
    
    const handleReviewClick = () => {
        toggleReviewing(!reviewing)
    }

    const updateReview = () => {
        toggleReviewing(!reviewing)
    }

    const renderButton = () => {
        return reviewing ? null : <button onClick={handleReviewClick}>Add Review</button>
    }

    const renderReview = (reviews) => {
        //coded for user's one review for now:
        return reviewing ? <CreateReview finishReviewing={updateReview} {...reviews[0]}/> : renderReviews(reviews)
    }
    
    const renderReviews = (reviews) => reviews.map(review=><Review key={review.id} {...review} />)

    const renderBook = () => {


        const { title, author, thumbnail, reviews } = props.data.book 

        return (
            <div>
                <h1>{title}</h1>
                <img src={thumbnail} alt={`thumbnail of ${title}`}/>
                <h3>{author.name}</h3>
                {renderReview(reviews)}
                {renderButton()}
            </div>
        )
    }


    return (
        <div>
            <Link to="/">Back</Link>
            {props.data.loading ? 
                <div>Loading!</div>
            :
                renderBook()
            }
        </div>
    )
}

export default graphql(
    getSingleBook, {
        options: (props) => ({ variables: { id: props.match.params.id } })
    }
)(BookShow)