import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

// Pages
import MainPage from './pages';
import AdminPage from './pages/admin';

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/admin" component={AdminPage} />
      </Router>
    )
  }
}

export default App;
