import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from '../redux/ActionCreater';
import { Form, Button, Image } from 'react-bootstrap';
import { Label } from 'reactstrap';

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (body) => {
    dispatch(Login(body));
  },
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this);
    this.state = {
      password: '',
      email: '',
    };
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

  render() {
    return (
      <div>
        <div className='card'>
          <div className='card-body'>
            <Form onSubmit={this.onSubmit}>
              <div style={{ textAlign: 'center' }}>
                <Image
                  src='https://lh3.googleusercontent.com/JnlxHFL3JALhh93JTTl0pqBoAuqc4tZBsAe8s02L-or5wtF8DFEKiSj72f5_rdUNMShPi4NTz13vRHyXElCrBqlrOA80Gw-QWekYyRDCcvQ2lmOq25ZbwTZsu1OzeYYvoPXiXzYJEhbRzGLVzaF8zzXBaRv5-bazBOCQJrvgERu-DQ9T_tAGK7uei3tGSZgZgmhvFePOM79ZSDcVHXgNQpdBWhPNdbzgIyh1YabUDVvtCJoKLgIPU7adkwTrcezAEd77KuGrtA-iEpiBr-QdbZO06Vu5zPFFi0vSGsTc06KwLJ7sLjzfrbrS6vz5f9ALGoux566w1IXDYpDFXBOEMXJtcq8Ywvx0X69MiaFQUkUsLUvm_6tyZoQStHW8XNPAUTkSiLfJZlbzp7NYun6BgIYCMkMEOx-ZAK4mPHBle-shrrKSIrDm6wtH8nxLCXI0XLzWhubBKLS9n3uqDDmdsDla7PK8akH4BgIvZewIe225sQXoIlKBTORhlV4mv7OQiMqkGvv9YTYcHuvx1Off8pk8jJ5S7PFTGcHLVduSlYxCNFbb3vuawmoPpeRs7pjYVnH9a7G5WVZvh8zzMf5tOw9NRiLg4j2JUB9O6NiLUXXGPrvwRFrjDU16s-6NEluOBTPpJfswntvo0FcHqq6P5dryO_jCSf8z_r3xNg8FULTkSb9KY5Uvb6J4wFwF=w958-h645-no?authuser=0'
                  alt=''
                  width='100'
                  height='70'
                />
                <h2>Login</h2>
              </div>
              <Form.Row style={{ marginBottom: '2%' }}>
                <Label htmlFor='email'>Email</Label>
                <Form.Control
                  required
                  id='email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </Form.Row>
              <Form.Row style={{ marginBottom: '2%' }}>
                <Label htmlFor='password'>Password</Label>

                <Form.Control
                  type='password'
                  required
                  id='password'
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Form.Row>
              <Form.Row style={{ marginBottom: '2%' }}>
                <button
                  className='btn'
                  style={{
                    color: 'white',
                    backgroundColor: '#248bc7',
                    border: '0',
                    borderRadius: '20px',
                  }}
                  type='submit'
                >
                  Login
                </button>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(LoginComponent);
