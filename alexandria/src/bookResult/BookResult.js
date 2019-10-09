import React from 'react'

const BookResults = (props) => {

    const renderAuthors = (authors) => authors.map((author, idx)=><h1 data-test="book-result-author" key={idx}>{author}</h1>)

    const renderThumbnail = (props) => {
        return props.imageLinks && props.imageLinks.thumbnail ? <img data-test="book-result-thumbnail" alt={`Thumbnail of ${props.title}'s cover`} src={props.imageLinks.thumbnail} /> : <img data-test="book-result-null-thumbnail" alt="no thumbnail found" src={null} />
    }

    return (
        <div data-test="book-result-component">
            <h1 data-test="book-result-title">{props.title}</h1>
            {props.authors ? renderAuthors(props.authors): null}
            {renderThumbnail(props)}
        </div>
    )
}

export default BookResults