import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Register } from '../redux/ActionCreater';
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
      city: '',
      description: '',
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
      city: '',
      description: '',
    });
    console.log(this);
  };
  render() {
    return (
      <div className='row' style={{ height: '100%' }}>
        <div className='col-12'>
          <Card style={{ padding: '5% auto' }}>
            <Card.Body>
              <form onSubmit={this.onSubmit}>
                <p className='h4 text-center py-4'>Create Account</p>

                <div className='md-form'>
                  <i className='fa fa-user prefix grey-text'></i>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    onChange={this.onChange}
                    value={this.state.name}
                    className='form-control'
                    placeholder='Name'
                    required
                  />
                </div>

                <div className='md-form'>
                  <i className='fa fa-envelope prefix grey-text'></i>
                  <input
                    type='email'
                    id='email'
                    onChange={this.onChange}
                    className='form-control'
                    name='email'
                    value={this.state.email}
                    placeholder='Email'
                    required
                  />
                </div>

                <div className='md-form'>
                  <i className='fa fa-lock prefix grey-text'></i>
                  <input
                    type='password'
                    id='password'
                    className='form-control'
                    onChange={this.onChange}
                    value={this.state.password}
                    name='password'
                    placeholder='Password'
                    required
                  />
                </div>

                <div className='md-form'>
                  <i className='fa fa-map-marker prefix grey-text'></i>
                  <input
                    type='text'
                    id='city'
                    className='form-control'
                    onChange={this.onChange}
                    value={this.state.city}
                    placeholder='City'
                    naem='city'
                  />
                </div>

                <div className='md-form'>
                  <i className='fa fa-sticky-note-o prefix grey-text'></i>
                  <input
                    type='text'
                    id='description'
                    className='form-control'
                    onChange={this.onChange}
                    name='description'
                    value={this.state.description}
                    placeholder='Bio'
                  />
                </div>

                <div className='text-center py-4 mt-3'>
                  <button className='btn btn-cyan' type='submit'>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
