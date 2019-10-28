import gql from 'graphql-tag'

export const addBookMutation = gql`
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

export const deleteBookMutation = gql`
    mutation DeleteUserBook($userId: ID!, $bookId: ID!) {
        deleteUserBook(userId: $userId, bookId: $bookId) {
            id
        }
    }
`

export const getUsersBooks = gql`
    query getUserBooks($userId: ID!){
        books (userId: $userId) {
            id
            title,
            author {
                name
            }, 
            thumbnail
        }
    }
`

export const fetchUserQuery = gql`
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