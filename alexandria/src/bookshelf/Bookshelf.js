import React, { useEffect } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUserQuery, deleteBookMutation } from '../queries/index'

import BookCard from '../bookcard/BookCard'

const BookShelf = (props) => {

    useEffect(()=>{
        props.data.refetch()
    })

    const renderBooks = () => {
        const { books } = props.data.user
        return books.map(book => <BookCard deleteBook={deleteBook} key={book.id} {...book} />)
    }

    const deleteBook = (id) => {
        props.deleteBookMutation({
            variables: {
                userId: props.userId,
                bookId: id
            },
            refetchQueries: [
                {
                    query: fetchUserQuery,
                }
            ]
        })
            .catch(err => err)
    }

    return (
        <div>
            <Link to="/library">Library</Link>
            {props.data.loading ?
                <div>Loading!</div>
                :
                <div data-test="bookshelf-component">
                    {renderBooks()}
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
}

export default compose(
    graphql(deleteBookMutation, {
        name: "deleteBookMutation"
    }),
    graphql(fetchUserQuery),
    connect(mapStateToProps)
)(BookShelf)

