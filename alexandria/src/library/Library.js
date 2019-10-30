import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// component imports
import BookSearch from '../bookSearch/BookSearchClass'
import BookResult from '../bookResult/BookResult'

const Library = (props) => {

    const renderResults = () => props.searchResults.map(result => <div key={result.id} data-test="book-result-div"><BookResult key={result.id}{...result.volumeInfo} /></div>)

    const renderError = () => props.error ? <h1>No Results!!</h1> : null

    return (
        <div data-test="library-component">
            <Link to="/">Bookshelf</Link>
            <BookSearch />
            {renderResults()}
            {renderError()}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        searchResults: state.bookSearchReducer.results,
        error: state.bookSearchReducer.error
    }
}

export default connect(mapStateToProps)(Library)