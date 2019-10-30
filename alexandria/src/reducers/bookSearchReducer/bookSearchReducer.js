import { actionTypes } from "../../actionTypes";

const state = {
    results: [],
    error: false
}

export default (defaultState = state, action) => {
    switch (action.type) {
        case actionTypes.ADD_SEARCH_RESULTS:
            if(action.payload && action.payload.length){
                return {
                    ...state,
                    results: [...action.payload],
                    error: false
                }
            }
        case actionTypes.ADD_SEARCH_ERROR:
            return {
                ...state, 
                error: true
            }
        default:
            return defaultState
    }
}