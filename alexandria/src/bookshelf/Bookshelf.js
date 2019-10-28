import React from 'react'

import { graphql } from 'react-apollo'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { fetchUserQuery, getUsersBooks, deleteBookMutation } from '../queries/index'

import Book from '../book/Book'


const BookShelf = (props) => {

    console.log(props)
    const renderBooks = () => {
        const { books } = props.data.user
        return books.map(book=><Book deleteBook={deleteBook} key={book.id} {...book}/>)
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
        .catch(err=>err)
    }

    return props.data.loading ? 
        <div>Loading!</div>
        :
        <div data-test="bookshelf-component">
            {renderBooks()}
        </div>
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
    // graphql(getUsersBooks, {
    //     name: "getUsersBooks",
    //     variables: {
    //         userId: 1
    //     }
    // }),
    graphql(fetchUserQuery),
    connect(mapStateToProps)
)(BookShelf)

