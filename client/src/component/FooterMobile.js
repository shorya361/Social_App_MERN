import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class FooterMobile extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: '60px',
          bottom: 0,
          position: 'fixed',
          width: '100%',
          zIndex: '1',
        }}
      >
        <Navbar variant='dark' bg='dark' fixed='bottom'>
          <Nav className='m-auto'>
            <Nav.Link href='/Home'>
              <span>
                <i className='fas fa-home'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='#'>
              <span>
                <i className='fas fa-search'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='/newPost'>
              <span>
                <i className='fas fa-plus-circle'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='/profile'>
              <span>
                <i className='far fa-user'></i>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default FooterMobile;
