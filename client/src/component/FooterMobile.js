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
          // width: '100%',
          zIndex: '1',
        }}
      >
        <Navbar style={{ backgroundColor: '#248bc7' }} fixed='bottom'>
          <Nav className='m-auto'>
            <Nav.Link href='/Home' active>
              <span>
                <i className='fas fa-home fa-lg'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='/findFriends' active>
              <span>
                <i className='fas fa-search fa-lg'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='/newPost' active>
              <span>
                <i className='fas fa-plus-circle fa-lg'></i>
              </span>
            </Nav.Link>
          </Nav>
          <Nav className='m-auto'>
            <Nav.Link href='/profile' active>
              <span>
                <i className='far fa-user fa-lg'></i>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default FooterMobile;
