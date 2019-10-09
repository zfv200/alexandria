import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../../test/testUtils'
import BookResult from './BookResult'

const singleAuthorProps = {
    title: "Shrek!", 
    authors: ["William Steig"],
    imageLinks: {
        thumbnail: "http://books.google.com/books/content?id=yLyJc-pSAHIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
}

const noAuthorProps = {
    title: "Shrek!",
    authors: [],
}

const multipleAuthorProps = {
    title: "Shrek!",
    authors: ["William Steig", "Not A. Realauthor"],
    imageLinks: {

    }
}



const setup = () => {
    return {
        singleAuthor: shallow(<BookResult {...singleAuthorProps}/>),
        multipleAuthors: shallow(<BookResult {...multipleAuthorProps} />),
        noAuthor: shallow(<BookResult {...noAuthorProps} />)
    }
}

describe('rendering', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = setup().singleAuthor
    })

    it('renders without crashing', ()=>{
        const component = findByTestAttr(wrapper, "book-result-component")
        expect(component.length).toBe(1)
    })

    it("renders the book's title", ()=>{
        const component = findByTestAttr(wrapper, "book-result-title")
        expect(component.length).toBe(1)
        expect(component.text()).toBe("Shrek!")
    })

    it("renders the book's single author", ()=>{
        const component = findByTestAttr(wrapper, "book-result-author")
        expect(component.length).toBe(1)
    })

    it("renders nothing when book has no author", ()=>{
        wrapper = setup().noAuthor
        const component = findByTestAttr(wrapper, "book-result-author")
        expect(component.length).toBe(0)
    })

    it("renders all the authors when book has multiple authors", ()=>{
        wrapper = setup().multipleAuthors 
        const component = findByTestAttr(wrapper, "book-result-author")
        expect(component.length).toBe(2)
    })

    it("renders the thumbnail when present", ()=>{
        wrapper = setup().singleAuthor
        const component = findByTestAttr(wrapper, "book-result-thumbnail")
        expect(component.length).toBe(1)
    })

    it("renders null image when thumbnail not present", ()=>{
        wrapper = setup().multipleAuthors
        let component = findByTestAttr(wrapper, "book-result-null-thumbnail")
        expect(component.length).toBe(1)
        wrapper = setup().noAuthor
        component = findByTestAttr(wrapper, "book-result-null-thumbnail")
        expect(component.length).toBe(1)
    })


})