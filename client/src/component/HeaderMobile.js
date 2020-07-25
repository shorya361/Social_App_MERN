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

class HeaderMobile extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
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
          ml={'0'}
          message={this.props.Alert[0].message}
          cls={'alert alert-'.concat(this.props.Alert[0].AlertType)}
          heading={heading}
        />
      );
    }
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
          display: 'flex',
          zIndex: '1',
        }}
      >
        <Navbar bg='dark' variant='dark' fixed='top'>
          <Navbar.Brand href='/'>
            <img
              src='https://lh3.googleusercontent.com/pw/ACtC-3dbz8yAfqdhnKiCqUsVJ6PaKVJtfcCftixF-BvEWgOyZpFJfBN36WJ_cN1god3MmpYVPMX3St4vgVKJIw9n-seTMhuFZuwCULd796bfQhB6vmKH3zj1zKElOUJT5vngjBc9fdSiDdICrcFpuuNMQbi-=w781-h672-no?authuser=0'
              height='35'
              width='41'
              alt='Art-App'
            />
          </Navbar.Brand>
          <Nav className='ml-auto'>
            <Nav.Link href='/' onClick={this.props.Logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className='w-100'>{this.showAlert()}</div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
