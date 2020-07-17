import React, { Component } from 'react';
import {
  NavDropdown,
  Form,
  FormControl,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
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
      return <Nav.Link href='#'>{this.props.Auth.user.name}</Nav.Link>;
    }
  }
  render() {
    console.log(this.props.Auth.user);
    return (
      <div>
        <Navbar bg='dark' variant='dark' expand='md'>
          <Navbar.Brand href='/'>Art-App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/Home'>Dashboard</Nav.Link>
              {this.AuthUser()}

              <div className='row'>
                <div className='col-8'>
                  <FormControl
                    type='text'
                    placeholder='Search'
                    className='mr-sm-1'
                  />
                </div>
                <div className='col-4'>
                  <Button variant='outline-success' size='sm'>
                    Search
                  </Button>
                </div>
              </div>
            </Nav>
            <Nav>
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
