import { actionTypes } from "../../actionTypes";

export default (defaultState = { id: 1, username: "Zach", email: "zach@aol.com" }, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return action.payload
        default:
            return defaultState
    }
}