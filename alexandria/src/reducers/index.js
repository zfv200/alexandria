import { combineReducers } from 'redux'
import booksReducer from './booksReducer/booksReducer'
import bookSearchReducer from './bookSearchReducer/bookSearchReducer'

export default combineReducers({'booksReducer': booksReducer, 'bookSearchReducer': bookSearchReducer})