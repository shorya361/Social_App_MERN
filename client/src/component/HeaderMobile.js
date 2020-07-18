import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Logout } from '../redux/ActionCreater';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  Logout: () => {
    dispatch(Logout());
  },
});

class HeaderMobile extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    // console.log(this.props.Auth.user);
    return (
      <div
        style={{
          position: 'fixed',
          top: '0',
          width: '100%',
          marginBottom: '50px',
        }}
      >
        <Navbar bg='dark' variant='dark' fixed='top'>
          <Navbar.Brand href='/'>
            <img
              src='https://i.pinimg.com/564x/4e/f1/5a/4ef15af8f8c11ae561460de81c920387.jpg'
              height='35'
              width='41'
              alt='Art-App'
            />
            Art-App
          </Navbar.Brand>
          <Nav className='ml-auto'>
            <Nav.Link onClick={this.props.Logout}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
