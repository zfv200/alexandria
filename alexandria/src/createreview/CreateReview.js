import React, { useState } from 'react'
import { compose } from 'redux'

import { updateReviewMutation, createReviewMutation } from '../queries/index'

import { graphql } from 'react-apollo'


const CreateReview = (props) => {

    const grabContent = () => props.content ? props.content : ""

    const [value, updateValue] = useState(grabContent())

    const updateReview = () => {
        props.mutate({
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
                content: value
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

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={value} 
                type="text" 
                onChange={(e)=>updateValue(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>Create Review</button>
        </form>
    )
}

export default compose(
    graphql(createReviewMutation, {
        name: "createReviewMutation"
    }),
    graphql(updateReviewMutation)
)(CreateReview)

// export default graphql(createReviewMutation)(graphql(updateReviewMutation)(CreateReview))