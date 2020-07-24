import React, { Component } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import Loading from './Loading';
import { addnewPost } from '../redux/ActionCreater';

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addnewPost: (body) => {
    dispatch(addnewPost(body));
  },
});

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      description: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this);
    const body = {
      name: '',
      image: this.state.image,
      description: this.state.description,
      userID: this.props.Auth.user._id,
    };
    this.props.addnewPost(body);
    this.setState({
      name: '',
      image: '',
      description: '',
    });
    this.props.history.push('/Home');
  };
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  render() {
    if (this.props.Auth.loading === true || !this.props.Auth.token) {
      return <Loading />;
    }
    return (
      <div style={{ marginTop: '150px' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div className='container' style={{ border: '1px solid black' }}>
            <h1>New Post</h1>
            <Form onSubmit={this.onSubmit}>
              <Label>Caption</Label>
              <FormControl
                type='text'
                className='mr-sm-1'
                id='description'
                onChange={this.onChange}
                value={this.state.description}
              />

              <Label>Image</Label>
              <FormControl
                type='text'
                className='mr-sm-1'
                id='image'
                onChange={this.onChange}
                value={this.state.image}
              />
              <Button variant='outline-success' type='submit'>
                Post
              </Button>
              <Button variant='outline-danger'>CANCEL</Button>
            </Form>
          </div>
          <FooterMobile />
        </div>
        <div className='d-none d-xl-block '>
          <Header />
          <div className='container' style={{ border: '1px solid black' }}>
            <h1>New Post</h1>
            <Form onSubmit={this.onSubmit}>
              <Label>Caption</Label>
              <FormControl
                type='text'
                className='mr-sm-1'
                id='description'
                onChange={this.onChange}
                value={this.state.description}
              />

              <Label>Image</Label>
              <FormControl
                type='text'
                className='mr-sm-1'
                id='image'
                onChange={this.onChange}
                value={this.state.Image}
              />
              <Button variant='outline-success' type='submit'>
                Post
              </Button>
              <Button variant='outline-danger'>CANCEL</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
