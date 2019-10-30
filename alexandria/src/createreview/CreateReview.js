import React, { useState } from 'react'

import { updateReviewMutation } from '../queries/index'

import { graphql } from 'react-apollo'


const CreateReview = (props) => {

    const grabContent = () => props.content ? props.content : ""

    const [value, updateValue] = useState(grabContent())

    const handleSubmit = (e) => {
        e.preventDefault()

        props.finishReviewing()
        props.mutate({
            variables: {
                bookId: props.bookId, 
                reviewId: props.id,
                content: value
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
            <button type="button" onClick={handleSubmit}>Create Review</button>
        </form>
    )
}

export default graphql(updateReviewMutation)(CreateReview)