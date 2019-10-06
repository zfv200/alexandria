import { actionTypes } from "../../actionTypes";

export default (defaultState = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_SEARCH_RESULTS:
            return [...action.payload]
        default:
            return defaultState
    }
    return defaultState
}