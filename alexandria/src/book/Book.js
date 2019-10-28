import React from 'react'
import { connect } from 'react-redux' 
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


const Book = (props) => {
    const { id, title, author, thumbnail } = props

    const deleteBook = () => {
        props.mutate({
            variables: {
                userId: props.userId,
                bookId: id
            }
        })
    }

    return (
        <div>
            <h1>{title}</h1>
            <img src={thumbnail} alt={`thumbnail of ${title}`} />
            <h3>{author.name}</h3>
            <button onClick={deleteBook}>Delete Book</button>
        </div>
    )

}

const mutation = gql`
    mutation DeleteUserBook($userId: ID!, $bookId: ID!) {
        deleteUserBook(userId: $userId, bookId: $bookId) {
            id
        }
    }
`
            
const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
}

export default connect(mapStateToProps)(graphql(mutation)(Book))