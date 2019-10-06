const searchEndpoint = 'https://www.googleapis.com/books/v1/volumes?'

export function searchGoogle(term){
    const url = searchEndpoint + `q=${term}`
    return getRequest(url).then(json=>json.items)
}

function getRequest(url){
    return fetch(url).then(res=>res.json()).then(json=>json)
}