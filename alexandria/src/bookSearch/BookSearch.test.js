import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, storeFactory } from '../../test/testUtils'
import BookSearch from './BookSearchClass'

const setup = (initialState={}) => {
    const store = storeFactory(initialState)
    const wrapper = shallow(<BookSearch store={store}/>).dive()
    return wrapper
}

const setupForLocalState = (props={}, state=null) => {
    const store = storeFactory()
    const wrapper = shallow(<BookSearch store={store}/>).dive()
    if(state){
        wrapper.setState(state)
    }
    return wrapper
}

describe('render', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = setup()
    })

    it('renders without crashing', () => {
        const component = findByTestAttr(wrapper, "book-search-component-input")
        expect(component.length).toBe(1)
    })

    it('renders the input field', ()=>{
        const component = findByTestAttr(wrapper, "input-component")
        expect(component.length).toBe(1)
    })

    it('renders blank component at first', ()=>{
        const initialValueState = wrapper.state('value')
        expect(initialValueState).toBe('')
    })

})

describe('user typing and deleting in search field', ()=>{

    it('renders the correct value when typed in', () => {
        const wrapper = setupForLocalState(null, { value: '' })
        const input = findByTestAttr(wrapper, "input-component")
        input.simulate('change', { target: { value: 'flowers' } })
        const updatedInput = findByTestAttr(wrapper, "input-component")

        expect(updatedInput.props().value).toBe('flowers')
    })

    it('clears out the value when deleted', () => {
        const wrapper = setupForLocalState(null, { value: 'flowers' })
        const input = findByTestAttr(wrapper, "input-component")
        input.simulate('change', { target: { value: '' } })
        const updatedInput = findByTestAttr(wrapper, "input-component")

        expect(updatedInput.props().value).toBe('')
    })

})

describe('book search bar submit', ()=>{
    it('should not submit if blank', ()=>{
        
    })
})
