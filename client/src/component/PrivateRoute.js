import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, Auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.token !== null ? <Component {...props} /> : <Redirect to='/' />
    }
    // It means that if we have a token in our local storage , then we can go to that component because load user will get us the user
    // but if we dont have a token , that we have to go back to the login page.
  />
);

PrivateRoute.propTypes = {
  Auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps)(PrivateRoute);
