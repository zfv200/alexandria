import { retrieveMyBooks } from './index'
import { actionTypes } from '../actionTypes';

describe('retrieveMyBooks', ()=>{
    test('returns an action with type `RETRIEVE_MY_BOOKS`', ()=>{
        const action = retrieveMyBooks();
        expect(action).toEqual({
            type: actionTypes.RETRIEVE_MY_BOOKS
        })
    })
})