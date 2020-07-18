import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profile from './component/Profile';
import Landing from './component/Landing';
import Home from './component/Home';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { LoadUser, LoadComments } from './redux/ActionCreater';
import setAuthToken from './utils/setAuthToken';
const store = ConfigureStore();
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
class App extends Component {
  componentDidMount() {
    console.log('App Component running');
    // console.log(this);
    store.dispatch(LoadUser());
    store.dispatch(LoadComments());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={Landing} />

          <section>
            <Switch>
              <Route exact path='/Home' component={Home} />
              <Route exact path='/profile' component={Profile} />
            </Switch>
          </section>
        </Router>
      </Provider>
    );
  }
}
export default App;
