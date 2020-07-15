import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class='card'>
          <div class='card-body'>
            <form>
              <p class='h4 text-center py-4'>Login</p>

              <div class='md-form'>
                <i class='fa fa-envelope prefix grey-text'></i>
                <input
                  type='email'
                  id='materialFormCardEmailEx'
                  class='form-control'
                />
                <label for='materialFormCardEmailEx' class='font-weight-light'>
                  Your email
                </label>
              </div>

              <div class='md-form'>
                <i class='fa fa-lock prefix grey-text'></i>
                <input
                  type='password'
                  id='materialFormCardPasswordEx'
                  class='form-control'
                />
                <label
                  for='materialFormCardPasswordEx'
                  class='font-weight-light'
                >
                  Your password
                </label>
              </div>

              <div class='text-center py-4 mt-3'>
                <button class='btn btn-cyan' type='submit'>
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
