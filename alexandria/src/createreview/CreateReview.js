import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { updateReviewMutation, createReviewMutation, getSingleReview, updateReviewAndAverageReview } from '../queries/index'

import { graphql } from 'react-apollo'

import StarRating from '../starrating/StarRating'



const CreateReview = (props) => {

    const grabContent = () => props.content ? props.content : ""
    const [value, updateValue] = useState(grabContent())

    const updateReview = () => {
        props.updateReviewMutation({
            variables: {
                bookId: props.bookId,
                reviewId: props.id,
                content: value
            }
        })
    }

    const createReview = () => {
        props.createReviewMutation({
            variables: {
                bookId: props.bookId,
                content: value,
                userId: props.userId
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        props.finishReviewing()
        if(props.id){
            updateReview()
        } else {
            createReview()
        }
    }

    // bookId: { type: new GraphQLNonNull(GraphQLID) },
    // reviewId: { type: new GraphQLNonNull(GraphQLID) },
    // starRating: {
    //     type: new GraphQLNonN

    const changeRating = (newRating) => {
        props.updateReviewAndAverageReview({
            variables: {
                bookId: props.bookId,
                reviewId: props.data.review.id,
                starRating: newRating.toString()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={value} 
                type="text" 
                onChange={(e)=>updateValue(e.target.value)}
            />
            <StarRating changeRating={changeRating} rating={!props.data.loading && props.data.review ? props.data.review.userRating : 0}/>
            <button type="button" onClick={handleSubmit}>Create Review</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
} 

export default compose(
    graphql(createReviewMutation, {
        name: "createReviewMutation"
    }),
    graphql(updateReviewMutation, {
        name: "updateReviewMutation"
    }),
    graphql(updateReviewAndAverageReview, {
        name: "updateReviewAndAverageReview"
    }),
    graphql(getSingleReview)
)(connect(mapStateToProps)(CreateReview))

// export default graphql(createReviewMutation)(graphql(updateReviewMutation)(CreateReview))