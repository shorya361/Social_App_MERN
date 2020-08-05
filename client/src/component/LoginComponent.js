import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login, resetPassword } from '../redux/ActionCreater';
import { Form, Image, FormControl } from 'react-bootstrap';
import { Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (body) => {
    dispatch(Login(body));
  },
  resetPassword: (body) => {
    dispatch(resetPassword(body));
  },
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this);
    this.state = {
      password: '',
      email: '',
      forgotemail: '',
      modal: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.forgotModal = this.forgotModal.bind(this);
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
      ...this.state,
      email: '',
      password: '',
    });
  };

  forgotModal() {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      forgotemail: '',
    });
  }
  sendMail(e) {
    e.preventDefault();
    const body = {
      email: this.state.forgotemail,
    };
    this.props.resetPassword(body);
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      forgotemail: '',
      email: '',
      password: '',
    });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.forgotModal}
          centered
          style={{ color: '#212E36' }}
        >
          <ModalHeader toggle={this.forgotModal}>Reset Password </ModalHeader>
          <ModalBody>
            <h4>
              It happens to the best of us. Enter your email and we'll send you
              reset instructions.
            </h4>
            <Form onSubmit={this.sendMail}>
              <Label htmlFor='forgotmail' style={{ margin: '0' }}>
                Enter Mail
              </Label>

              <FormControl
                type='text'
                className='mr-sm-1'
                id='forgotemail'
                value={this.state.forgotemail}
                onChange={this.onChange}
              />

              <button
                className='btn'
                type='submit'
                style={{
                  color: 'white',
                  backgroundColor: '#248bc7',
                  border: '0',
                  borderRadius: '20px',
                }}
                // onClick={this.onDeletePost}
              >
                Send Mail.
              </button>
            </Form>
          </ModalBody>
        </Modal>

        <Form onSubmit={this.onSubmit}>
          <div style={{ textAlign: 'center' }}>
            <Image
              src='https://res.cloudinary.com/shorya361/image/upload/v1596630839/Images/t4t5mbjzudefpytpbw38.png'
              alt=''
              width='100'
              height='70'
              style={{ marginBottom: '4px' }}
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
          <p style={{ textAlign: 'right' }}>
            <a href='#' onClick={this.forgotModal} style={{ color: 'black' }}>
              forgot password
            </a>
          </p>
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
    );
  }
}
export default connect(null, mapDispatchToProps)(LoginComponent);
