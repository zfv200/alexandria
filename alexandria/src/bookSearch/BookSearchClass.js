import React from 'react'
import { connect } from 'react-redux'

// adapter functions:
import { searchGoogle } from '../adapter/adapter'

//actions: 
import { addSearchResults } from '../actions/index'

class BookSearch extends React.Component {
    state={
        value: '',
    }

    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        if(this.state.value!==''){
            searchGoogle(this.state.value)
            .then(results=>{
                this.props.addSearchResults(results)
            })
        }
    }

    render(){
        return (
            <form data-test="book-search-component-input" onSubmit={this.handleFormSubmit}>
                <input
                    data-test="input-component"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleValueChange}
                />
                {}
            </form>
        )
    }
}

export default connect(null, { addSearchResults })(BookSearch)