import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from '../redux/ActionCreater';

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
            <form onSubmit={this.onSubmit}>
              <p className='h4 text-center py-4'>Login</p>

              <div className='md-form'>
                <i className='fa fa-envelope prefix grey-text'></i>
                <input
                  type='email'
                  id='email'
                  className='form-control'
                  value={this.state.email}
                  required
                  onChange={this.onChange}
                  placeholder='Email'
                />
              </div>

              <div className='md-form'>
                <i className='fa fa-lock prefix grey-text'></i>
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  required
                  value={this.state.password}
                  className='form-control'
                  onChange={this.onChange}
                />
              </div>

              <div className='text-center py-4 mt-3'>
                <button className='btn btn-cyan' type='submit'>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(LoginComponent);
