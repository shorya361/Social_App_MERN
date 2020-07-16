import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Registration from './Registration';
import Login from './Login';
import { Form, Col, Toast } from 'react-bootstrap';
import Alert from './Alert';
import { Navbar, Nav, Button, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert, removeAlert } from '../redux/ActionCreater';

const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setAlert: (message, AlertType) => {
    dispatch(setAlert(message, AlertType));
  },
  removeAlert: () => {
    dispatch(removeAlert());
  },
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.AA = this.AA.bind(this);
  }
  componentDidMount() {
    this.props.removeAlert();
  }

  AA() {
    if (this.props.Alert[0]) {
      const cls = 'alert alert-'.concat(this.props.Alert[0].AlertType);
      let heading = '';
      if (this.props.Alert[0].AlertType == 'danger') {
        heading = 'Sorry..';
      } else {
        heading = 'Congrats';
      }
      console.log(this.props.Alert[0]);
      return (
        <Alert
          cls={cls}
          message={this.props.Alert[0].message}
          heading={heading}
        />
      );
    } else {
      return <div></div>;
    }
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
          {this.AA()}
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
                <Form>
                  <Form.Row>
                    <Col>
                      <Form.Control placeholder='Email' />
                    </Col>
                    <Col>
                      <Form.Control type='password' placeholder='Password' />
                    </Col>
                    <Col>
                      <button className='btn-xm btn-cyan mt-1' type='submit'>
                        Register
                      </button>
                    </Col>
                  </Form.Row>
                </Form>
              </Nav>
            </div>
          </Navbar>
          {this.AA()}
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
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
