import { actionTypes } from '../../actions/index'
import { addSearchResults } from '../../actions/index'
import bookSearchReducer from './bookSearchReducer'

const mockResults = [
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

it('returns default initial state of empty array when no action type is provided', ()=>{
    const newState = bookSearchReducer(undefined, { type: null })
    expect(newState).toEqual([])
})

it('returns array of search results when type is `ADD_SEARCH_RESULTS`', ()=>{
    const action = addSearchResults(mockResults)
    const newState = bookSearchReducer(undefined, action)
    expect(newState).toEqual(mockResults)
})

