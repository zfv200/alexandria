import React from 'react'
import { withRouter } from 'react-router-dom'

const BookCard = (props) => {
    const { id, title, author, thumbnail } = props

    const deleteBook = () => {
        props.deleteBook(id)
    }

    const handleBookClick = () => {
        props.history.push(`/books/${id}`)
    }

    return (
        <div>
            <div onClick={handleBookClick}>
                <h1>{title}</h1>
                <img src={thumbnail} alt={`thumbnail of ${title}`} />
                <h3>{author.name}</h3>
            </div>
            <button onClick={deleteBook}>Delete Book</button>
        </div>
    )

}


export default withRouter(BookCard)