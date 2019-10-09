import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';

import { findByTestAttr } from '../test/testUtils'
import BookShelf from './bookshelf/Bookshelf'
import Library from './library/Library'

import { library } from './App'
import App from './App'

const setup = () => {
    return shallow(<App />).dive().dive()
};

test('library function returns library component', ()=>{
    const component = library()
    expect(component).toEqual(<Library />)
})

it('renders without crashing', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, "app-component")
    expect(component.length).toBe(1)
});
