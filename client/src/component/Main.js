import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Footer from '../component/footer';
import Landing from '../component/Landing';
import Home from '../component/Home';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Route exact path='/' component={Landing} />
        <section>
          <Switch>
            <Route exact path='/Home' component={Home} />
          </Switch>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
