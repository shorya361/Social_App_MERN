import React, { Component } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
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
      <Card style={{ padding: '5% auto' }}>
        <Card.Body>
          <Form onSubmit={this.onSubmit}>
            <div style={{ textAlign: 'center' }}>
              <Image
                src='https://lh3.googleusercontent.com/JnlxHFL3JALhh93JTTl0pqBoAuqc4tZBsAe8s02L-or5wtF8DFEKiSj72f5_rdUNMShPi4NTz13vRHyXElCrBqlrOA80Gw-QWekYyRDCcvQ2lmOq25ZbwTZsu1OzeYYvoPXiXzYJEhbRzGLVzaF8zzXBaRv5-bazBOCQJrvgERu-DQ9T_tAGK7uei3tGSZgZgmhvFePOM79ZSDcVHXgNQpdBWhPNdbzgIyh1YabUDVvtCJoKLgIPU7adkwTrcezAEd77KuGrtA-iEpiBr-QdbZO06Vu5zPFFi0vSGsTc06KwLJ7sLjzfrbrS6vz5f9ALGoux566w1IXDYpDFXBOEMXJtcq8Ywvx0X69MiaFQUkUsLUvm_6tyZoQStHW8XNPAUTkSiLfJZlbzp7NYun6BgIYCMkMEOx-ZAK4mPHBle-shrrKSIrDm6wtH8nxLCXI0XLzWhubBKLS9n3uqDDmdsDla7PK8akH4BgIvZewIe225sQXoIlKBTORhlV4mv7OQiMqkGvv9YTYcHuvx1Off8pk8jJ5S7PFTGcHLVduSlYxCNFbb3vuawmoPpeRs7pjYVnH9a7G5WVZvh8zzMf5tOw9NRiLg4j2JUB9O6NiLUXXGPrvwRFrjDU16s-6NEluOBTPpJfswntvo0FcHqq6P5dryO_jCSf8z_r3xNg8FULTkSb9KY5Uvb6J4wFwF=w958-h645-no?authuser=0'
                alt=''
                width='100'
                height='70'
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
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
