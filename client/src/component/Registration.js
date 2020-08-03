import React, { Component } from 'react';
import { Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Register } from '../redux/ActionCreater';
import { Label } from 'reactstrap';
const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
    Auth: state.Auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  Register: (body) => {
    dispatch(Register(body));
  },
});
class Registration extends Component {
  constructor(props) {
    super(props);
    // console.log(this);
    this.state = {
      name: '',
      email: '',
      password: '',
      city: 'unavailable',
      description: 'unavailable',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log('before calling!!');

    const body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
      description: this.state.description,
      AdminCode: 'NO',
    };
    this.props.Register(body);
    this.setState({
      name: '',
      email: '',
      password: '',
      city: 'unavailable',
      description: 'unavailable',
    });
    console.log(this);
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <div style={{ textAlign: 'center' }}>
            <Image
              src='https://lh3.googleusercontent.com/oGbtZslNXIIOLSZssJpFURphI7xk5GEZTv2bz2k_7xFWHoO8RgKHvBZiLUEhtcghR0TCvvhANCR1uz4EWYLJzMWzNPVkVly4iOFL_AieoDI_YKOoVsw-vqOEHRMto7fzDmzQMN_qDToNu1eebGLePJU7ah08scJ57OqAeaH3ogGacgk9FO-6TTnJZIVZHf8hG-QtZfpx3S1TNfi5sxv8_jBYh5Z2cWgSfXA9N2MgQuRc6BDatpRZP7kHO4gB1lKmtZ0yh9fo1hWeRQhjayORrduIaE0on3nl1yoqfvGJ3cqP2l77f1Ain59Q6nv7PUjrxPqqDsFe5TRxxmkrr2iSSjTMETLoqtJj_afvZ7YC-0_YqTM-oUAzrR02NHAXRpoeWJcpwpcvSu-Z4gFCUCE8Yy_LYMFT6XQOwyJQsAZWunfx8BmvQHfzMCUQ0fah9diFKAXGwPZx8uoEzhrHyRvFjNePfM-5NPT0v5whnmOfatfIcd7rJOz8_bMD3WuRzlZSh7dFMeS2kaZJ3uoyMu4-qwFfTu6m0g_9TeGbTIvjpZXfI5Klz5yeONUPTq4ssqNo6eUJWbJhZV3Sv0OTD04sryn9rvJe05_6ozcD6Z7b4DDXQgU_Bzx59FpeBbU0emIZD9wMQ1_kE8CSW1oX4xCeAZ1CsWRQ4Z1sCkwuUEqmDG5DRSylZv0c3BuHLpZL=w327-h220-no?authuser=0'
              alt=''
              width='100'
              height='70'
              style={{ marginBottom: '4px' }}
            />
            <h2>Create Account</h2>
          </div>
          <Form.Row style={{ marginBottom: '2%' }}>
            <Label htmlFor='name'>Name</Label>

            <Form.Control
              type='text'
              id='name'
              name='name'
              onChange={this.onChange}
              value={this.state.name}
              required
            />
          </Form.Row>

          <Form.Row style={{ marginBottom: '2%' }}>
            <Label htmlFor='email'>Email</Label>
            <Form.Control
              type='email'
              id='email'
              onChange={this.onChange}
              name='email'
              value={this.state.email}
              required
            />
          </Form.Row>

          <Form.Row style={{ marginBottom: '3%' }}>
            <Label htmlFor='password'>Password</Label>
            <Form.Control
              type='password'
              id='password'
              onChange={this.onChange}
              value={this.state.password}
              name='password'
              required
            />
          </Form.Row>

          {/* <Form.Row style={{ marginBottom: '2%' }}>
                  <Label htmlFor='city'>City</Label>
                  <Form.Control
                    type='text'
                    id='city'
                    className='form-control'
                    onChange={this.onChange}
                    value={this.state.city}
                    name='city'
                  />
                </Form.Row>

                <Form.Row style={{ marginBottom: '2%' }}>
                  <Label htmlFor='description'>Bio</Label>
                  <Form.Control
                    type='text'
                    id='description'
                    onChange={this.onChange}
                    name='description'
                    value={this.state.description}
                  />
                </Form.Row> */}

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
              Register
            </button>
          </Form.Row>
        </Form>{' '}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
