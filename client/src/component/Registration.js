import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../redux/ActionCreater';
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      city: '',
      description: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log('before calling!!');
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        city: this.state.city,
        description: this.state.description,
        AdminCode: 'NO',
      };
      // console.log('before calling!!');
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        body,
        config
      );
      if (response.data.errors) {
        this.props.setAlert(response.data.errors.msg, 'danger');
        // alert(response.data.errors.msg);
        this.props.ALERT();
      } else {
        this.props.setAlert('Account Created', 'success');
      }
      // console.log(response);
      console.log('after calling :' + this);
      this.setState({
        name: '',
        email: '',
        password: '',
        city: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className='row'>
        <div className='col-12'>
          <Card style={{ padding: '5% auto' }}>
            <Card.Body>
              <form onSubmit={this.onSubmit}>
                <p class='h4 text-center py-4'>Create Account</p>

                <div class='md-form'>
                  <i class='fa fa-user prefix grey-text'></i>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    onChange={this.onChange}
                    value={this.state.name}
                    class='form-control'
                    placeholder='Name'
                    required
                  />
                </div>

                <div class='md-form'>
                  <i class='fa fa-envelope prefix grey-text'></i>
                  <input
                    type='email'
                    id='email'
                    onChange={this.onChange}
                    class='form-control'
                    name='email'
                    value={this.state.email}
                    placeholder='Email'
                    required
                  />
                </div>

                <div class='md-form'>
                  <i class='fa fa-lock prefix grey-text'></i>
                  <input
                    type='password'
                    id='password'
                    class='form-control'
                    onChange={this.onChange}
                    value={this.state.password}
                    name='password'
                    placeholder='Password'
                    required
                  />
                </div>

                <div class='md-form'>
                  <i class='fa fa-map-marker prefix grey-text'></i>
                  <input
                    type='text'
                    id='city'
                    class='form-control'
                    onChange={this.onChange}
                    value={this.state.city}
                    placeholder='City'
                    naem='city'
                  />
                </div>

                <div class='md-form'>
                  <i class='fa fa-sticky-note-o prefix grey-text'></i>
                  <input
                    type='text'
                    id='description'
                    class='form-control'
                    onChange={this.onChange}
                    name='description'
                    value={this.state.description}
                    placeholder='Bio'
                  />
                </div>

                <div class='text-center py-4 mt-3'>
                  <button class='btn btn-cyan' type='submit'>
                    Register
                  </button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(null, { setAlert })(Registration);
