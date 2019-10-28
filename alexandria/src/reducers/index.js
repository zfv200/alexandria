import { combineReducers } from 'redux'
import booksReducer from './booksReducer/booksReducer'
import bookSearchReducer from './bookSearchReducer/bookSearchReducer'
import userReducer from './userReducer/userReducer'

export default combineReducers({
    'booksReducer': booksReducer, 
    'bookSearchReducer': bookSearchReducer,
    'userReducer': userReducer
})