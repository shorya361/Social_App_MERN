import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='card'>
          <div className='card-body'>
            <form>
              <p className='h4 text-center py-4'>Login</p>

              <div className='md-form'>
                <i className='fa fa-envelope prefix grey-text'></i>
                <input
                  type='email'
                  id='materialFormCardEmailEx'
                  className='form-control'
                />
                <label
                  htmlFor='materialFormCardEmailEx'
                  className='font-weight-light'
                >
                  Your email
                </label>
              </div>

              <div className='md-form'>
                <i className='fa fa-lock prefix grey-text'></i>
                <input
                  type='password'
                  id='materialFormCardPasswordEx'
                  className='form-control'
                />
                <label
                  htmlFor='materialFormCardPasswordEx'
                  className='font-weight-light'
                >
                  Your password
                </label>
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
export default Login;
