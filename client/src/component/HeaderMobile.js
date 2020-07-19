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
          zIndex: '1',
        }}
      >
        <Navbar bg='dark' variant='dark' color='black' fixed='top'>
          <Navbar.Brand href='/'>
            <img
              src='https://lh3.googleusercontent.com/pw/ACtC-3cK8sGe_YfICN18-P1sqNkaJMhGNfRgZxd3yl2PJSEJE7g60fECjIi62HtwD6w-yjyLyphNhF83vpN22OI99H4i-ElJ-8ZecayXB0UimB2gBvigmR9oSUs62GL_-HiCKNUAvvRlCTLTsPQ64MbYhdMt=s937-no?authuser=0'
              height='35'
              width='41'
              alt='Art-App'
            />
            Art-App
          </Navbar.Brand>
          <Nav className='ml-auto'>
            <Nav.Link href='/' onClick={this.props.Logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
