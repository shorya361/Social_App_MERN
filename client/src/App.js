import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './component/footer';
import Landing from './component/Landing';
import Home from './component/Home';
import Header from './component/Header';
const App = () => (
  <Router>
    <Fragment>
      <Route exact path='/' component={Landing} />
      <section>
        <Switch>
          <Route exact path='/Home' component={Home} />
        </Switch>
      </section>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
