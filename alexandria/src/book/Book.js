import React from 'react'

const Book = (props) => {
    const { id, title, author, thumbnail } = props

    const deleteBook = () => {
        props.deleteBook(id)
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


export default Book