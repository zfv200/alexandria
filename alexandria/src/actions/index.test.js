import { 
            retrieveMyBooks, 
            addSearchResults 
        } from './index'
import { actionTypes } from '../actionTypes';

describe('retrieveMyBooks', ()=>{
    test('returns an action with type `RETRIEVE_MY_BOOKS`', ()=>{
        const action = retrieveMyBooks();
        expect(action).toEqual({
            type: actionTypes.RETRIEVE_MY_BOOKS
        })
    })
})

describe('addSearchResults', () => {
    test('returns an action with type `ADD_SEARCH_RESULTS`', () => {
        const action = addSearchResults();
        expect(action).toEqual({
            type: actionTypes.ADD_SEARCH_RESULTS
        })
    })
})