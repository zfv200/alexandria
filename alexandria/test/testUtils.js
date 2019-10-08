import rootReducer from '../src/reducers/index'
import { createStore } from 'redux'

//create a store for tests
export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState)
}

//expression to find component
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

