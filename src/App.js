import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Travels from './travels/travel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Travels} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
