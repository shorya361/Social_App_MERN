import React, { Component } from 'react';
import Registration from './Registration';
import LoginComponent from './LoginComponent';
import { Image } from 'react-bootstrap';
import Alert from './Alert';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Login } from '../redux/ActionCreater';
import { FadeTransform } from 'react-animation-components';

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
      Form: true,
    };
    this.AA = this.AA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.Register = this.Register.bind(this);
  }

  ShowForm() {
    if (this.state.Form === true)
      return (
        <div className='container'>
          <LoginComponent />
          <p
            style={{ color: '#0066cc', textAlign: 'right' }}
            onClick={this.Register}
          >
            {' '}
            <a href='/#'>Create Account.</a>
          </p>{' '}
          <div
            className='row'
            style={{ textAlign: 'center', justifyContent: 'center' }}
          >
            <div
              className='row w-100'
              style={{ textAlign: 'center', justifyContent: 'center' }}
            >
              <p>Follow me</p>
            </div>
            <div
              className='row w-100'
              style={{ textAlign: 'center', justifyContent: 'center' }}
            >
              {' '}
              <a
                className='btn btn-social-icon btn-github'
                href='https://github.com/shorya361'
              >
                <i className='fa fa-github' style={{ color: 'white' }}></i>
              </a>
              <a
                className='btn btn-social-icon btn-linkedin'
                href='https://www.linkedin.com/in/shorya-upadhayay-b5827b188/'
              >
                <i className='fa fa-linkedin' style={{ color: 'white' }}></i>
              </a>
              <a
                className='btn btn-social-icon btn-instagram'
                href='https://www.instagram.com/punk_gts_434/?hl=en'
              >
                <i className='fa fa-instagram' style={{ color: 'white' }}></i>
              </a>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className='container'>
          <Registration />
          <p
            style={{ color: '#0066cc', textAlign: 'right' }}
            onClick={this.Register}
          >
            {' '}
            <a href='/#'>Login</a>
          </p>
        </div>
      );
  }
  Register() {
    this.setState({
      ...this.state,
      Form: !this.state.Form,
    });
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
    }
    // else {
    //   return (
    //     <div style={{ height: '10%', marginTop: '10%' }}>
    //       {' '}
    //       <img
    //         src='https://lh3.googleusercontent.com/JnlxHFL3JALhh93JTTl0pqBoAuqc4tZBsAe8s02L-or5wtF8DFEKiSj72f5_rdUNMShPi4NTz13vRHyXElCrBqlrOA80Gw-QWekYyRDCcvQ2lmOq25ZbwTZsu1OzeYYvoPXiXzYJEhbRzGLVzaF8zzXBaRv5-bazBOCQJrvgERu-DQ9T_tAGK7uei3tGSZgZgmhvFePOM79ZSDcVHXgNQpdBWhPNdbzgIyh1YabUDVvtCJoKLgIPU7adkwTrcezAEd77KuGrtA-iEpiBr-QdbZO06Vu5zPFFi0vSGsTc06KwLJ7sLjzfrbrS6vz5f9ALGoux566w1IXDYpDFXBOEMXJtcq8Ywvx0X69MiaFQUkUsLUvm_6tyZoQStHW8XNPAUTkSiLfJZlbzp7NYun6BgIYCMkMEOx-ZAK4mPHBle-shrrKSIrDm6wtH8nxLCXI0XLzWhubBKLS9n3uqDDmdsDla7PK8akH4BgIvZewIe225sQXoIlKBTORhlV4mv7OQiMqkGvv9YTYcHuvx1Off8pk8jJ5S7PFTGcHLVduSlYxCNFbb3vuawmoPpeRs7pjYVnH9a7G5WVZvh8zzMf5tOw9NRiLg4j2JUB9O6NiLUXXGPrvwRFrjDU16s-6NEluOBTPpJfswntvo0FcHqq6P5dryO_jCSf8z_r3xNg8FULTkSb9KY5Uvb6J4wFwF=w958-h645-no?authuser=0'
    //         alt=''
    //         width='100'
    //         height='70'
    //         style={{ marginLeft: '38%' }}
    //       />{' '}
    //     </div>
    //   );
    // }
  }
  render() {
    if (this.props.Auth.isAuthenticated) {
      return <Redirect to='/Home' />;
    }
    return (
      <div className='full-width' style={{ height: '100%' }}>
        <div
          className='d-xl-none'
          style={{ height: '100%', backgroundColor: '#f5f5f6' }}
        >
          <Navbar style={{ backgroundColor: '#248bc7' }} />
          <div style={{ height: '100px', zIndex: '1' }}>{this.AA('100%')}</div>
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translatey(-50%)',
            }}
          >
            <div className='container'>{this.ShowForm()}</div>
          </FadeTransform>
        </div>

        <div
          className='d-none d-xl-block h-100 '
          style={{ padding: '5% 7%', backgroundColor: '#93BEDF' }}
        >
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translatey(-50%)',
            }}
          >
            <div
              style={{
                // borderRadius: '20px',
                height: '100%',
                backgroundColor: '#f5f5f6',
              }}
            >
              <div
                className='row w-100 h-100'
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  margin: '0',
                }}
              >
                <div className='col-8 h-100 p-0'>
                  <Image
                    src='https://images.pexels.com/photos/583846/pexels-photo-583846.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
                <div className='col-4 h-100 p-0'>
                  <div
                    className='row'
                    style={{
                      height: '170px',
                      paddingLeft: '20%',
                      paddingBottom: '20px',
                      paddingTop: '20px',
                    }}
                  >
                    {this.AA('73%')}
                  </div>
                  <div className='container' style={{ padding: '0% 8%' }}>
                    {this.ShowForm()}
                  </div>
                </div>
              </div>
            </div>
          </FadeTransform>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
