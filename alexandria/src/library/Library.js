import React from 'react'
import { connect } from 'react-redux'

// component imports
import BookSearch from '../bookSearch/BookSearchClass'
import BookResult from '../bookResult/BookResult'

const Library = (props) => {

    const renderResults = () => props.searchResults.map(result => <div key={result.id} data-test="book-result-div"><BookResult key={result.id}{...result.volumeInfo}/></div>)

    return (
        <div data-test="library-component">
            <BookSearch />
            {renderResults()}
        </div>
    )
}

function mapStateToProps(state){
    return {
        searchResults: state.bookSearchReducer
    }
}

export default connect(mapStateToProps)(Library)