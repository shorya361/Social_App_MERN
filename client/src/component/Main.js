import React, { Component, Fragment } from 'react';
import { setAlert, removeAlert } from '../redux/ActionCreater';
import { Route, Switch, withRouter } from 'react-router-dom';
import Alert from './Alert';
import Footer from '../component/footer';
import Landing from '../component/Landing';
import Home from '../component/Home';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setAlert: (message, AlertType) => {
    dispatch(setAlert(message, AlertType));
  },
  removeAlert: () => {
    dispatch(removeAlert());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(this);
  }

  componentDidMount() {
    console.log('Main :' + this.props);
    this.props.removeAlert();
  }

  render() {
    return (
      <Fragment>
        {/* <Alert alerts={this.props.Alert} /> */}
        <Route
          exact
          path='/'
          component={Landing}
          setAlert={this.props.setAlert}
          Alert={this.props.Alert}
        />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
