import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Landing from './component/Landing';
const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path='/' component={Landing} />
    </Fragment>
  </Router>
);

export default App;
