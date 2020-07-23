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
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPost from './component/NewPost';
const store = ConfigureStore();
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
class App extends Component {
  componentDidMount() {
    console.log('App Component running');
    store.dispatch(LoadUser());
    store.dispatch(LoadComments());
  }

  // componentWillReceiveProps(nextProps) {

  //   console.log(nextProps);
  // }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={Landing} />

          <section>
            {/* <TransitionGroup>
              <CSSTransition
                key={this.props.location.key}
                classNames='page'
                timeout={300}
              > */}
            <Switch>
              <Route exact path='/Home' component={Home} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/newPost' component={NewPost} />
            </Switch>
            {/* </CSSTransition>
            </TransitionGroup> */}
          </section>
        </Router>
      </Provider>
    );
  }
}
export default App;
