import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


const BookShelf = (props) => {

    return (
        <div data-test="bookshelf-component">
            
        </div>
    )
}

const query = gql`
    {
        user(id:"1") {
            id
            username
            email
        }
    }
`

export default graphql(query)(BookShelf)

