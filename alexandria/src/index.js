import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './configureStore'

const client = new ApolloClient({
    link: createHttpLink({ uri: '/api/v1/graphql' }),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider> 
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
