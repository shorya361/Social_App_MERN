import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profile from './component/Profile';
import Landing from './component/Landing';
import Home from './component/Home';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { LoadUser, LoadComments, LoadAllUsers } from './redux/ActionCreater';
import setAuthToken from './utils/setAuthToken';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NewPost from './component/NewPost';
import FindFriends from './component/FIndFriends';
import ProfileID from './component/ProfileID';
const store = ConfigureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);

  store.dispatch(LoadUser());
  store.dispatch(LoadComments());
  store.dispatch(LoadAllUsers());
}
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('App Component running');
  }

  // componentWillReceiveProps(nextProps) {

  //   console.log(nextProps);
  // }
  render() {
    const ProfileUser = ({ match }) => {
      //   console.log(match.params);
      return <ProfileID userID={match.params.profileID} />;
    };
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
              <Route exact path='/findFriends' component={FindFriends} />
              <Route path='/Userprofile/:profileID' component={ProfileUser} />
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
