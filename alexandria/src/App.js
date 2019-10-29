import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Library from './library/Library'
import Bookshelf from './bookshelf/Bookshelf'
import BookShow from './bookshow/BookShow'

export const library = () => {
  return <Library />
}

function App() {

  return (
    <Router>
      <div className="App" data-test="app-component">
        <div>
          <Route exact path="/" component={Bookshelf} />
          <Route path="/library" component={library} />
          <Route path="/books/:id" component={BookShow} />
        </div>          
      </div>
    </Router>
  );
}

export default App;
