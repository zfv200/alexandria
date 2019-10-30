import React, { useState } from 'react'



const CreateReview = (props) => {

    const grabContent = () => props.content ? props.content : ""

    const [value, updateValue] = useState(grabContent())

    const handleSubmit = () => {
        props.finishReviewing()

    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={value} 
                type="text" 
                onChange={(e)=>updateValue(e.target.value)}
            />
            <button type="submit">Create Review</button>
        </form>
    )
}

export default CreateReview