import { actionTypes } from '../actionTypes/index'

//retrieve user's books from database for their bookshelf
export function retrieveMyBooks(bookArray){
    return {
        type: actionTypes.RETRIEVE_MY_BOOKS,
        payload: bookArray
    }
} 

export function addSearchResults(results){
    return {
        type: actionTypes.ADD_SEARCH_RESULTS,
        payload: results
    }
}

export function addSearchError(){
    return {
        type: actionTypes.ADD_SEARCH_ERROR,
        payload: true
    }
}

