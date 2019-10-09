import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../../test/testUtils'
import Bookshelf from './Bookshelf'

const setup = () => {
    return shallow(<Bookshelf />)
}

it('renders without crashing', ()=>{
    const wrapper = setup()
    const component = findByTestAttr(wrapper, "bookshelf-component")
    expect(component.length).toBe(1)
})