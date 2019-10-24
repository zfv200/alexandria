import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Book from '../book/Book'


const BookShelf = (props) => {

    const renderBooks = () => {
        const { books } = props.data.user
        return books.map(book=><Book key={book.id} {...book}/>)
    }

    return props.data.loading ? 
        <div>Loading!</div>
        :
        <div data-test="bookshelf-component">
            {renderBooks()}
        </div>
}

const query = gql`
    {
        user(id:"1") {
            id
            username
            email
            books { 
                id
                title
                thumbnail
                author {
                    name
                }
            }
        }
    }
`

export default graphql(query)(BookShelf)

