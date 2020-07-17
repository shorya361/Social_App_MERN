import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './component/Main';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { LoadUser } from './redux/ActionCreater';
import setAuthToken from './utils/setAuthToken';
const store = ConfigureStore();
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
class App extends Component {
  componentDidMount() {
    console.log('App Component running');
    store.dispatch(LoadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }
}
export default App;
