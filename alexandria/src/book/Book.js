import React from 'react'


const Book = (props) => {
    const { title, author, thumbnail } = props

    return (
        <div>
            <h1>{title}</h1>
            <img src={thumbnail} alt={`thumbnail of ${title}`} />
            <h3>{author.name}</h3>
        </div>
    )

}

export default Book