import gql from 'graphql-tag'

export const addBookMutation = gql`
    mutation AddBook($userId: ID!, $title: String!, $authors: [String!], $thumbnail: String!) {
        addBook (userId: $userId, title: $title, authors: $authors, thumbnail: $thumbnail) {
            id
            title 
            thumbnail 
            author {
                id
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

export const createReviewMutation = gql`
    mutation CreateBookReview($bookId: ID!, $content: String!, $userId: ID!, $userRating: String!){
        createBookReview(bookId: $bookId, content: $content, userId: $userId, userRating: $userRating){
            id
            reviews {
                id
                content
            }
        }
    }
`

export const updateReviewMutation = gql`
    mutation UpDateBookReview($bookId: ID!, $reviewId: ID!, $content: String!){
        updateBookReview(bookId: $bookId, reviewId: $reviewId, content: $content){
            id
		    reviews {
                id
                content
            }
        }
    }
`

export const getUsersBooks = gql`
    query getUserBooks($userId: ID!){
        books (userId: $userId) {
            id
            title,
            author {
                id
                name
            }, 
            thumbnail
        }
    }
`

export const getSingleBook = gql`
    query getSingleBook($id: ID!){
        book(id: $id){
            id
            title 
            reviews {
                id
                content 
                userId
            }
            author {
                id
                name
            }
            thumbnail
        }
    }
`

// place where id is hardcoded:
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
                    id
                    name
                }
            }
        }
    }
`

export const getSingleReview = gql`
    query getSingleReview($id: ID!) {
        review(id: $id){
            id
            content
            userRating
        }
    }
`

export const updateReviewAndAverageReview = gql`
    mutation UpdateReviewAndAverageReview($bookId: ID!, $reviewId: ID!, $starRating: String!){
        updateReviewAndAverageReview(bookId: $bookId, reviewId: $reviewId, starRating: $starRating){
            id
            averageRating
            reviews {
                id
                content
                userRating
            }
        }
    }
`