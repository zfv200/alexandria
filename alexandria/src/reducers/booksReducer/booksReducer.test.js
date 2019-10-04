import { actionTypes } from '../../actions/index'
import { retrieveMyBooks } from '../../actions/index'
import booksReducer from './booksReducer'

//to be replaced once objects are constructed
const userBooks = [
    'book1',
    'book2',
    'book3'
]

test('returns default initial state of empty array when no specified action type is provided', ()=>{
    const newState = booksReducer(undefined, {type: null})
    expect(newState).toEqual([])
})

test('returns array of user`s books when type is `RETRIEVE_MY_BOOKS`', ()=>{
    const action = retrieveMyBooks(userBooks)
    const newState = booksReducer(undefined, action)
    expect(newState).toEqual(['book1', 'book2', 'book3'])
})