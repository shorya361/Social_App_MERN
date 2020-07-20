import React, { Component } from 'react';
import { Form, FormControl, Navbar, Nav, Button } from 'react-bootstrap';
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
      <div style={{ marginBottom: '50px', zIndex: '1' }}>
        <Navbar bg='dark' variant='dark' fixed='top' expand='md'>
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
            <Nav>
              <Nav.Link href='/Home'>Dashboard</Nav.Link>
            </Nav>
            <Nav className=' ml-auto mr-auto '>
              <Form>
                <FormControl
                  type='text'
                  placeholder='Search User'
                  className='mr-sm-1'
                />
              </Form>
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
