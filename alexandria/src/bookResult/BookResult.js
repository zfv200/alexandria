import React from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

const BookResults = (props) => {

    const renderAuthors = (authors) => authors.map((author, idx)=><h1 data-test="book-result-author" key={idx}>{author}</h1>)

    const renderThumbnail = (props) => {
        return props.imageLinks && props.imageLinks.thumbnail ? <img data-test="book-result-thumbnail" alt={`Thumbnail of ${props.title}'s cover`} src={props.imageLinks.thumbnail} /> : <img data-test="book-result-null-thumbnail" alt="no thumbnail found" src={null} />
    }
    const handleClick = () => {
        const thumbnail = () => props.imageLinks && props.imageLinks.thumbnail ? props.imageLinks.thumbnail : null
        
        const variables = {
            userId: props.userId,
            title: props.title,
            authors: props.authors,
            thumbnail: thumbnail()
        }
        
        props.mutate({
            variables: variables
        })
    }

    return (
        <div data-test="book-result-component">
            <h1 data-test="book-result-title">{props.title}</h1>
            {props.authors ? renderAuthors(props.authors): null}
            {renderThumbnail(props)}
            <button onClick={handleClick}>Save Book</button>
        </div>
    )
}

const mutation = gql`
    mutation AddBook($userId: ID!, $title: String!, $authors: [String!], $thumbnail: String!) {
        addBook (userId: $userId, title: $title, authors: $authors, thumbnail: $thumbnail) {
            id
            title 
            thumbnail 
            author {
                name
            }
        }
    }
`

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
}

export default connect(mapStateToProps)(graphql(mutation)(BookResults))