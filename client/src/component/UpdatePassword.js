import React, { Component } from 'react';
import { Form, Image } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { ChangePassword, setAlert } from '../redux/ActionCreater';
import Alert from './Alert';
import { FadeTransform } from 'react-animation-components';
const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
  };
};
const mapDispatchToProps = (dispatch) => ({
  ChangePassword: (body) => dispatch(ChangePassword(body)),
  setAlert: (message, AlertType) => dispatch(setAlert(message, AlertType)),
});
class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password2 !== this.state.password1) {
      this.props.setAlert('passwords dont match', 'danger');

      this.setState({
        password1: '',
        password2: '',
      });
      return;
    } else {
      const body = {
        UserID: this.props.userId,
        token: this.props.token,
        password: this.state.password1,
      };
      this.props.ChangePassword(body);
    }
  };
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
      return (
        <Alert
          ml={ml}
          cls={cls}
          message={this.props.Alert[0].message}
          heading={heading}
        />
      );
    }
  }
  render() {
    return (
      <div className='full-width' style={{ height: '100%' }}>
        <div
          className='d-xl-none'
          style={{ height: '100%', backgroundColor: '#f5f5f6' }}
        >
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translatey(-50%)',
            }}
          >
            <div className='container' style={{ paddingTop: '10px' }}>
              <div style={{ height: '130px' }}>{this.AA('100%')}</div>
              <Form onSubmit={this.onSubmit}>
                <div style={{ textAlign: 'center' }}>
                  <Image
                    src='https://res.cloudinary.com/shorya361/image/upload/v1596630839/Images/t4t5mbjzudefpytpbw38.png'
                    alt=''
                    width='100'
                    height='70'
                    style={{ marginBottom: '4px' }}
                  />
                  <h2>Change Password</h2>
                </div>
                <Form.Row style={{ marginBottom: '2%' }}>
                  <Label htmlFor='password1'>Enter Password</Label>
                  <Form.Control
                    required
                    type='password'
                    id='password1'
                    value={this.state.password1}
                    onChange={this.onChange}
                  />
                </Form.Row>
                <Form.Row style={{ marginBottom: '2%' }}>
                  <Label htmlFor='password2'>Confirm Password</Label>

                  <Form.Control
                    type='password'
                    required
                    id='password2'
                    value={this.state.password2}
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
                    Reset Password
                  </button>
                </Form.Row>
                <p
                  style={{ color: '#0066cc', textAlign: 'right' }}
                  onClick={this.Register}
                >
                  {' '}
                  <a href='/'>Back to Home</a>
                </p>
              </Form>
            </div>
          </FadeTransform>
        </div>
        <div
          className='d-none d-xl-block h-100 '
          style={{ padding: '5% 7%', backgroundColor: '#93BEDF' }}
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
                // alignContent: 'center',
                justifyContent: 'center',
                margin: '0',
              }}
            >
              {' '}
              <div className='container' style={{ margin: '5% 30%' }}>
                <FadeTransform
                  in
                  transformProps={{
                    exitTransform: 'scale(0.5) translatey(-50%)',
                  }}
                  style={{ height: '100%', width: '100%' }}
                >
                  <div
                    className='row'
                    style={{
                      width: '100%',
                      padding: '0px',
                      marginLeft: '1%',
                      height: '15%',
                    }}
                  >
                    {this.AA('100%')}
                  </div>
                  <Form onSubmit={this.onSubmit} style={{ marginTop: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Image
                        src='https://res.cloudinary.com/shorya361/image/upload/v1596630839/Images/t4t5mbjzudefpytpbw38.png'
                        alt=''
                        width='100'
                        height='70'
                        style={{ marginBottom: '4px' }}
                      />
                      <h2>Change Password</h2>
                    </div>
                    <Form.Row style={{ marginBottom: '2%' }}>
                      <Label htmlFor='password1'>Enter Password</Label>
                      <Form.Control
                        required
                        type='password'
                        id='password1'
                        value={this.state.password1}
                        onChange={this.onChange}
                      />
                    </Form.Row>
                    <Form.Row style={{ marginBottom: '2%' }}>
                      <Label htmlFor='password2'>Confirm Password</Label>

                      <Form.Control
                        type='password'
                        required
                        id='password2'
                        value={this.state.password2}
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
                        Reset Password
                      </button>
                    </Form.Row>
                  </Form>
                  <p
                    style={{ color: '#0066cc', textAlign: 'right' }}
                    onClick={this.Register}
                  >
                    {' '}
                    <a href='/'>Back to Home</a>
                  </p>
                </FadeTransform>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
