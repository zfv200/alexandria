import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Library from './Library'
import Bookshelf from './Bookshelf'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <div>
          <Route exact path="/" component={Bookshelf} />
          <Route path="/library" component={Library} />
        </div>          
        </header>
      </div>
    </Router>
  );
}

export default App;
