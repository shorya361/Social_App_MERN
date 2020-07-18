import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Registration from './Registration';
import LoginComponent from './LoginComponent';
import { Form, Col } from 'react-bootstrap';
import Alert from './Alert';
import { Navbar, Nav, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Login } from '../redux/ActionCreater';

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (body) => {
    dispatch(Login(body));
  },
});

const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
    Auth: state.Auth,
  };
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.AA = this.AA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const body = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.LoginUser(body);
    this.setState({
      email: '',
      password: '',
    });
  };

  componentDidMount() {
    // console.log(this);
    if (this.props.Auth.isAuthenticated && this.props.Auth.user) {
      return <Redirect to='/Home' />;
    }
  }
  AA(mr) {
    if (this.props.Alert[0]) {
      const cls = 'alert alert-'.concat(this.props.Alert[0].AlertType);
      let heading = '';
      const ml = mr;
      if (this.props.Alert[0].AlertType == 'danger') {
        heading = 'Sorry..';
      } else {
        heading = 'Congrats';
      }
      // console.log(this.props.Alert[0]);
      return (
        <Alert
          ml={ml}
          cls={cls}
          message={this.props.Alert[0].message}
          heading={heading}
        />
      );
    } else {
      return <div style={{ height: '10%' }}> </div>;
    }
  }
  render() {
    if (this.props.Auth.isAuthenticated) {
      return <Redirect to='/Home' />;
    }
    return (
      <div className='full-width'>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <Navbar bg='dark' variant='dark'>
            <div className='container' style={{ justifyContent: 'center' }}>
              <Navbar.Brand>
                <h3>
                  <strong>
                    <img
                      src='https://i.pinimg.com/564x/4e/f1/5a/4ef15af8f8c11ae561460de81c920387.jpg'
                      height='30'
                      width='41'
                      alt='Art-App'
                    />{' '}
                    Art-App
                  </strong>
                </h3>
              </Navbar.Brand>
            </div>
          </Navbar>
          <div className='container '>
            <div className='row'>
              <div
                style={{ height: '100px', justifyContent: 'center' }}
                className='col-12'
              >
                {' '}
                <p></p> {this.AA('27%')}
              </div>
              <div className='col-12' style={{ height: '100%' }}>
                <Tabs>
                  <Tab eventKey='Login' title='Login'>
                    <LoginComponent />
                  </Tab>
                  <Tab eventKey='Sign Up' title='Sign Up'>
                    <Registration />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className='d-none d-xl-block '>
          <Navbar variant='dark' bg='dark'>
            <div className='container'>
              <Navbar.Brand>
                <strong> Art-App</strong>
              </Navbar.Brand>
              <Nav className='justify-content-end'>
                <Form onSubmit={this.onSubmit}>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        placeholder='Email'
                        required
                        id='email'
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        required
                        id='password'
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </Col>
                    <Col>
                      <button className='btn-xm btn-cyan mt-1' type='submit'>
                        Login
                      </button>
                    </Col>
                  </Form.Row>
                </Form>
              </Nav>
            </div>
          </Navbar>
          <div className='row'>
            <div
              style={{ height: '130px', justifyContent: 'center' }}
              className='col-12'
            >
              {' '}
              {this.AA('42%')}
            </div>

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
