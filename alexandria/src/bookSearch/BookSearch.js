import React, { useState } from 'react'
import { connect } from 'react-redux'

// adapter functions:
import { searchGoogle } from '../adapter/adapter'

//actions: 
import { addSearchResults } from '../actions/index'

const BookSearch = (props) => {

    const [formValue, updateFormValue] = useState("")

    const handleValueChange = (e) => {
        updateFormValue(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        searchGoogle(formValue).then(results=>props.addSearchResults(results))
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                value={formValue}
                onChange={handleValueChange}
            />
        </form>
    )   
}

export default connect(null, { addSearchResults })(BookSearch)