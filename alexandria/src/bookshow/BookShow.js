import React from 'react'
import { graphql } from 'react-apollo'

import { Link } from 'react-router-dom'

import { getSingleBook } from '../queries/index'




const BookShow = (props) => {

    const { id } = props.match.params

    const renderBook = () => {
        const { title, author, thumbnail } = props.data.book 
        return (
            <div>
                <h1>{title}</h1>
                <img src={thumbnail} />
                <h3>{author.name}</h3>
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