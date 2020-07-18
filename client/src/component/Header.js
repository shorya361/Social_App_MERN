import React, { Component } from 'react';
import { FormControl, Navbar, Nav, Button } from 'react-bootstrap';
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

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.AuthUser = this.AuthUser.bind(this);
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
  render() {
    return (
      <div style={{ marginBottom: '50px' }}>
        <Navbar bg='dark' variant='dark' fixed='top' expand='md'>
          <Navbar.Brand href='/'>
            <img
              src='https://i.pinimg.com/564x/4e/f1/5a/4ef15af8f8c11ae561460de81c920387.jpg'
              height='30'
              width='41'
              alt='Art-App'
            />
            Art-App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <Nav.Link href='/Home'>Dashboard</Nav.Link>
            </Nav>
            <Nav className=' ml-auto mr-auto '>
              <div className='row' style={{ justifyContent: 'center' }}>
                <div className='col-9'>
                  <FormControl
                    type='text'
                    placeholder='Search User'
                    className='mr-sm-1'
                  />
                </div>
                <div className='col-3'>
                  <Button variant='outline-success' size='sm'>
                    Search
                  </Button>
                </div>
              </div>
            </Nav>
            <Nav>
              {this.AuthUser()}
              <Nav.Link href='/' onClick={this.props.Logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
