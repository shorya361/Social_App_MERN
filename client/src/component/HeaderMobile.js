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
          ml={'100%'}
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
        <Navbar fixed='top' style={{ backgroundColor: '#248bc7' }}>
          <Navbar.Brand href='/'>
            <img
              src='https://lh3.googleusercontent.com/pw/ACtC-3dlxShfWFc9Kn8BGyGTNZcWzLkfr87DiDB9QG85Unn10PwI-Vug3n5h6Iupu8JyHfrXR-7C9-BfPAWsdNOGtn8gyNyszFlU49_KHFrgYBlsqB55ZLHjdYNG_jNeSRmoB75bE6ulXHDfEzCG85UyUYLa=w932-h624-no?authuser=0'
              height='35'
              width='55'
              alt='Art-App'
            />
          </Navbar.Brand>
          <Nav className='ml-auto'>
            <Nav.Link href='/' onClick={this.props.Logout} active>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className='w-100' style={{ marginTop: '70px' }}>
          {' '}
          {this.showAlert()}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
