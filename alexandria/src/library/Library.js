import React from 'react'
import { connect } from 'react-redux'

// component imports
import BookSearch from '../bookSearch/BookSearch'
import BookResult from '../bookResult/BookResult'

const Library = (props) => {

    const renderResults = () => props.searchResults.map(result=><BookResult {...result.volumeInfo}/>)

    return (
        <div>
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