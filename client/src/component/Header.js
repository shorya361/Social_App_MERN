import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Logout } from '../redux/ActionCreater';
import { connect } from 'react-redux';
import Alert from './Alert';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Alert: state.Alert,
  };
};

const mapDispatchToProps = (dispatch) => ({
  Logout: () => {
    dispatch(Logout());
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.AuthUser = this.AuthUser.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  AuthUser() {
    if (this.props.Auth.user) {
      return <Nav.Link href='/profile'>{this.props.Auth.user.name}</Nav.Link>;
    }
  }
  showAlert() {
    if (this.props.Alert.length > 0) {
      let heading = '';

      if (this.props.Alert[0].AlertType === 'danger') {
        heading = 'Sorry..';
      } else {
        heading = 'Congrats';
      }
      return (
        <Alert
          ml={'42%'}
          message={this.props.Alert[0].message}
          cls={'alert alert-'.concat(this.props.Alert[0].AlertType)}
          heading={heading}
        />
      );
    }
  }
  render() {
    return (
      <div style={{ marginBottom: '50px', zIndex: '1' }} className='fixed-top'>
        <Navbar variant='light' bd='light' expand='md'>
          <Navbar.Brand href='/'>
            <img
              src='https://lh3.googleusercontent.com/pw/ACtC-3dbz8yAfqdhnKiCqUsVJ6PaKVJtfcCftixF-BvEWgOyZpFJfBN36WJ_cN1god3MmpYVPMX3St4vgVKJIw9n-seTMhuFZuwCULd796bfQhB6vmKH3zj1zKElOUJT5vngjBc9fdSiDdICrcFpuuNMQbi-=w781-h672-no?authuser=0'
              height='30'
              width='41'
              alt='Art-App'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav style={{ border: '1px solid black' }}>
              <Nav.Link href='/Home'>Dashboard</Nav.Link>
            </Nav>
            <Nav style={{ border: '1px solid black' }}>
              <Nav.Link href='/newPost'>Create Post</Nav.Link>
            </Nav>
            <Nav style={{ border: '1px solid black' }}>
              <Nav.Link href='/findFriends'>Find Friends</Nav.Link>
            </Nav>

            <Nav className=' ml-auto mr-auto '></Nav>
            <Nav>
              {this.AuthUser()}
              <Nav.Link href='/' onClick={this.props.Logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.showAlert()}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
