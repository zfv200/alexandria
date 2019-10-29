import React from 'react'
import { graphql } from 'react-apollo'

import { Link } from 'react-router-dom'

import { getSingleBook } from '../queries/index'

import Review from '../review/Review'

const BookShow = (props) => {

    const { id } = props.match.params

    const renderBook = () => {

        const { title, author, thumbnail, reviews } = props.data.book 

        return (
            <div>
                <h1>{title}</h1>
                <img src={thumbnail} />
                <h3>{author.name}</h3>
                {renderReviews(reviews)}
                <button>Add Review</button>
            </div>
        )
    }

    const renderReviews = (reviews) => reviews.map(review=><Review key={review.id} {...review} />)

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