import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Registration from './Registration';
import Login from './Login';
import { Form, Col } from 'react-bootstrap';
import { Navbar, Nav, Button, Carousel } from 'react-bootstrap';
class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='full-width'>
        <div className='d-xl-none'>
          <Navbar variant='dark' bg='dark'>
            <div className='container'>
              <Navbar.Brand>
                <strong> Art-App</strong>
              </Navbar.Brand>
            </div>
          </Navbar>
          <div className='container ' style={{ paddingTop: '18%' }}>
            <Tabs>
              <Tab eventKey='Login' title='Login'>
                <Login />
              </Tab>
              <Tab eventKey='Sign Up' title='Sign Up'>
                <Registration />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className='d-none d-xl-block '>
          <Navbar variant='dark' bg='dark'>
            <div className='container'>
              <Navbar.Brand>
                <strong> Art-App</strong>
              </Navbar.Brand>
              <Nav className='justify-content-end'>
                <Form Inline>
                  <Form.Row>
                    <Col>
                      <Form.Control placeholder='Email' />
                    </Col>
                    <Col>
                      <Form.Control type='password' placeholder='Password' />
                    </Col>
                    <Col>
                      <button class='btn-xm btn-cyan mt-1' type='submit'>
                        Register
                      </button>
                    </Col>
                  </Form.Row>
                </Form>
              </Nav>
            </div>
          </Navbar>
          <div className='row' style={{ marginTop: '5%' }}>
            <div className='col-6 ' style={{ marginLeft: '5%' }}>
              <Carousel>
                <Carousel.Item style={{ height: '100%' }}>
                  <img
                    className='d-block h-100 w-100'
                    src='https://images2.minutemediacdn.com/image/upload/c_crop,h_1914,w_2835,x_0,y_372/v1556647489/shape/mentalfloss/62280-mona_lisa-wiki.jpg?itok=Mo85fMQD'
                    alt='First slide'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 h-100'
                    src='https://pnptc-media.s3.amazonaws.com/images/future-millennial-banking.2e16d0ba.fill-1200x800.jpg'
                    alt='Third slide'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 h-100'
                    src='https://gaadiwaadi.com/wp-content/uploads/2017/02/Customised-Royal-Enfield-Himalayan-9-1200x800.jpg'
                    alt='Third slide'
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className='col-4' style={{ marginLeft: '3%' }}>
              <Registration />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
