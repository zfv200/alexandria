import { actionTypes } from "../../actionTypes";

export default (defaultState=[], action) => {
    switch(action.type){
        case actionTypes.RETRIEVE_MY_BOOKS:
            return [...action.payload]
        default: 
            return defaultState
    }
}
