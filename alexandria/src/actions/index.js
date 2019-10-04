import { actionTypes } from '../actionTypes/index'

//retrieve user's books from database for their bookshelf
export function retrieveMyBooks(){
    return {
        type: actionTypes.RETRIEVE_MY_BOOKS
    }
} 

