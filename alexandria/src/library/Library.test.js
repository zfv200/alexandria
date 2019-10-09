import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, storeFactory } from '../../test/testUtils'
import { bookSearchReducer } from '../reducers/bookSearchReducer/bookSearchReducer'
import Library from './Library'
import BookResult from '../bookResult/BookResult';

const mockProps = {
    bookSearchReducer: [
        {
            title: "Shrek!",
            authors: ["William Steig"],
            imageLinks: {
                thumbnail: "http://books.google.com/books/content?id=yLyJc-pSAHIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            }
        },
        {
            title: "Shrek 2!",
            authors: ["William Steig"],
            imageLinks: {
                thumbnail: "http://books.google.com/books/content?id=yLyJc-pSAHIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            }
        },
        {
            title: "Shrek 3!",
            authors: ["William Steig"],
            imageLinks: {
                thumbnail: "http://books.google.com/books/content?id=yLyJc-pSAHIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            }
        }
    ]
}

const setup = (initialState = {}) => {
    const store = storeFactory(initialState)
    const wrapper = shallow(<Library store={store} />).dive().dive()
    return wrapper
}

describe('render', () => {

    it('renders without crashing', () => {
        const wrapper = setup()
        const component = findByTestAttr(wrapper, "library-component")
        expect(component.length).toBe(1)
    })

    it('renders all search results from props', () =>{
        const initialState = mockProps
        const wrapper = setup(initialState)
        const component = findByTestAttr(wrapper, "book-result-div")
        expect(component.length).toBe(3)
    })

})