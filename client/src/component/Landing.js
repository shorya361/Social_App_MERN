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
    if (
      this.props.Auth.isAuthenticated === true &&
      this.props.Auth.user !== null
    ) {
      return <Redirect to='/Home' />;
    }
  };

  componentDidMount() {
    // console.log(this);
    if (
      this.props.Auth.isAuthenticated === true &&
      this.props.Auth.user !== null
    ) {
      return <Redirect to='/Home' />;
    }
  }
  AA(mr) {
    if (this.props.Alert[0]) {
      const cls = 'alert alert-'.concat(this.props.Alert[0].AlertType);
      let heading = '';
      const ml = mr;
      if (this.props.Alert[0].AlertType === 'danger') {
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
      return (
        <div style={{ height: '10%', marginTop: '10%' }}>
          {' '}
          <img
            src='https://lh3.googleusercontent.com/JnlxHFL3JALhh93JTTl0pqBoAuqc4tZBsAe8s02L-or5wtF8DFEKiSj72f5_rdUNMShPi4NTz13vRHyXElCrBqlrOA80Gw-QWekYyRDCcvQ2lmOq25ZbwTZsu1OzeYYvoPXiXzYJEhbRzGLVzaF8zzXBaRv5-bazBOCQJrvgERu-DQ9T_tAGK7uei3tGSZgZgmhvFePOM79ZSDcVHXgNQpdBWhPNdbzgIyh1YabUDVvtCJoKLgIPU7adkwTrcezAEd77KuGrtA-iEpiBr-QdbZO06Vu5zPFFi0vSGsTc06KwLJ7sLjzfrbrS6vz5f9ALGoux566w1IXDYpDFXBOEMXJtcq8Ywvx0X69MiaFQUkUsLUvm_6tyZoQStHW8XNPAUTkSiLfJZlbzp7NYun6BgIYCMkMEOx-ZAK4mPHBle-shrrKSIrDm6wtH8nxLCXI0XLzWhubBKLS9n3uqDDmdsDla7PK8akH4BgIvZewIe225sQXoIlKBTORhlV4mv7OQiMqkGvv9YTYcHuvx1Off8pk8jJ5S7PFTGcHLVduSlYxCNFbb3vuawmoPpeRs7pjYVnH9a7G5WVZvh8zzMf5tOw9NRiLg4j2JUB9O6NiLUXXGPrvwRFrjDU16s-6NEluOBTPpJfswntvo0FcHqq6P5dryO_jCSf8z_r3xNg8FULTkSb9KY5Uvb6J4wFwF=w958-h645-no?authuser=0'
            alt=''
            width='100'
            height='70'
            style={{ marginLeft: '38%' }}
          />{' '}
        </div>
      );
    }
  }
  render() {
    if (this.props.Auth.isAuthenticated) {
      return <Redirect to='/Home' />;
    }
    return (
      <div className='full-width'>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <Navbar>
            <div className='container' style={{ justifyContent: 'center' }}>
              <Navbar.Brand>
                <h3>
                  <strong>
                    <img
                      src='https://lh3.googleusercontent.com/pw/ACtC-3dbz8yAfqdhnKiCqUsVJ6PaKVJtfcCftixF-BvEWgOyZpFJfBN36WJ_cN1god3MmpYVPMX3St4vgVKJIw9n-seTMhuFZuwCULd796bfQhB6vmKH3zj1zKElOUJT5vngjBc9fdSiDdICrcFpuuNMQbi-=w781-h672-no?authuser=0'
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
            <div className='row w-100'>
              <div
                style={{ height: '100px', justifyContent: 'center' }}
                className='col-12'
              >
                {' '}
                {this.AA('27%')}
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
          <Navbar>
            <div className='container'>
              <Navbar.Brand>
                <h3>
                  <strong>
                    <img
                      src='https://lh3.googleusercontent.com/pw/ACtC-3dbz8yAfqdhnKiCqUsVJ6PaKVJtfcCftixF-BvEWgOyZpFJfBN36WJ_cN1god3MmpYVPMX3St4vgVKJIw9n-seTMhuFZuwCULd796bfQhB6vmKH3zj1zKElOUJT5vngjBc9fdSiDdICrcFpuuNMQbi-=w781-h672-no?authuser=0'
                      height='35'
                      width='41'
                      alt='Art-App'
                    />{' '}
                    Art-App
                  </strong>
                </h3>
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
          <div className='row w-100'>
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
