import React, { Component } from 'react';
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
            marginTop: '115%',
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
            padding: '125% 0px 0px 0px',
          }}
        >
          <img
            src='https://res.cloudinary.com/shorya361/image/upload/v1596632133/Images/vh7nz4q4rafuklqdrewt.png'
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
            marginTop: '115%',
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
            marginTop: '115%',
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
            marginTop: '115%',
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
            marginTop: '115%',
            paddingLeft: '4px',
          }}
        >
          <a href='/' onClick={this.props.Logout} style={{ color: 'black' }}>
            <i className='fas fa-sign-out-alt fa-3x'></i>{' '}
          </a>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
