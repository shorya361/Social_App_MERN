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
      return (
        <div
          className='row'
          style={{
            width: '100%',
            margin: '0',
            marginTop: '70px',
            paddingLeft: '5px',
          }}
        >
          <a href='/profile' style={{ color: 'black' }}>
            <i className='far fa-user fa-3x'></i>{' '}
          </a>
        </div>
      );
      // <Nav.Link href='/profile'>{this.props.Auth.user.name}</Nav.Link>;
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
      <div
        style={{
          height: '100%',
          width: '70px',
          backgroundColor: '#248bc7',
          margin: '0px',
          padding: '0px 8px 0px 9px',
        }}
      >
        <div
          className='row'
          style={{
            width: '100%',
            margin: '0',
            padding: '40px 0px 20px 0px',
          }}
        >
          <img
            src='https://lh3.googleusercontent.com/pw/ACtC-3dlxShfWFc9Kn8BGyGTNZcWzLkfr87DiDB9QG85Unn10PwI-Vug3n5h6Iupu8JyHfrXR-7C9-BfPAWsdNOGtn8gyNyszFlU49_KHFrgYBlsqB55ZLHjdYNG_jNeSRmoB75bE6ulXHDfEzCG85UyUYLa=w932-h624-no?authuser=0'
            height='40'
            width='100%'
            alt='Art-App'
          />
        </div>
        <div
          className='row'
          style={{
            width: '100%',
            margin: '0',
            marginTop: '50px',
          }}
        >
          <a href='/Home' style={{ color: 'black' }}>
            <i className='fas fa-home fa-3x'></i>
          </a>
        </div>
        <div
          className='row '
          style={{
            width: '100%',
            margin: '0',
            marginTop: '70px',
            paddingLeft: '2px',
          }}
        >
          <a href='/findFriends' style={{ color: 'black' }}>
            <i className='fas fa-search fa-3x'></i>
          </a>
        </div>
        <div
          className='row'
          style={{
            width: '100%',
            margin: '0',
            marginTop: '70px',
            paddingLeft: '2px',
          }}
        >
          <a href='/newPost' style={{ color: 'black' }}>
            <i className='fas fa-plus-circle fa-3x'></i>
          </a>
        </div>
        {this.AuthUser()}
        <div
          className='row'
          style={{
            width: '100%',
            margin: '0',
            marginTop: '70px',
            paddingLeft: '4px',
          }}
        >
          <a href='/' onClick={this.props.Logout} style={{ color: 'black' }}>
            <i class='fas fa-sign-out-alt fa-3x'></i>{' '}
          </a>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
