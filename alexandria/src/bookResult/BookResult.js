import React from 'react'

const BookResults = (props) => {

    const renderAuthors = (authors) => authors.map(author=><h1>{author}</h1>)

    const renderThumbnail = (imageLinks) => {
        return imageLinks.thumbnail ? <img src={imageLinks.thumbnail} /> : <img src={null} />
    }

    return (
        <div>
            <h1>{props.title}</h1>
            {props.authors ? renderAuthors(props.authors): null}
            {renderThumbnail(props.imageLinks)}
        </div>
    )
}

export default BookResults