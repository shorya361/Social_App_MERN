import React, { Component } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import { Form, FormControl } from 'react-bootstrap';
import { Label } from 'reactstrap';
import axios from 'axios';
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
      description: '',
      uploadedImage: null,
      loading: null,
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick = async (e) => {
    this.setState({
      loading: (
        <span
          class='spinner-border spinner-border-sm mr-2'
          role='status'
          aria-hidden='true'
        ></span>
      ),
    });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Images');
    // data.append('cloud_name', 'shorya361');
    const res = await axios.post(
      'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/shorya361/image/upload',
      data
    );
    // console.log(res.data.secure_url);
    this.setState({
      ...this.state,
      uploadedImage: res.data.secure_url,
      loading: null,
    });
    // console.log('done');
    // const file = await res.json();
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this);
    const body = {
      name: '',
      image: this.state.uploadedImage,
      description: this.state.description,
      userID: this.props.Auth.user._id,
    };
    this.props.addnewPost(body);
    this.setState({
      name: '',
      image: '',
      description: '',
      uploadedImage: null,
      loading: null,
    });
    setTimeout(() => this.props.history.push('/Home'), 1000);
  };
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  render() {
    if (this.props.Auth.loading === true || !this.props.Auth.token) {
      return <Loading />;
    }
    return (
      <div style={{ height: '100%' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div className='container' style={{ marginTop: '150px' }}>
            <h1>New Post</h1>
            <Form onSubmit={this.onSubmit}>
              <Form.Row style={{ marginBottom: '3%' }}>
                <Label style={{ margin: '0' }}>Caption</Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='description'
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </Form.Row>
              <Form.Row style={{ marginBottom: '3%' }}>
                <Label style={{ margin: '0' }}>Image</Label>
                <div className='row w-100' style={{ paddingLeft: '18px' }}>
                  <div className='col-11 p-0'>
                    <FormControl
                      type='file'
                      className='mr-sm-1'
                      id='Image'
                      onChange={this.onClick}
                    />
                  </div>
                  <div className='col-1'>{this.state.loading}</div>
                </div>
              </Form.Row>
              <button
                className='btn'
                style={{
                  color: 'white',
                  backgroundColor: '#248bc7',
                  border: '0',
                  borderRadius: '20px',
                }}
                variant='outline-success'
                type='submit'
              >
                Post
              </button>
            </Form>
          </div>
          <FooterMobile />
        </div>
        <div
          className='d-none d-xl-block h-100 '
          style={{
            padding: '5% 7%',
            backgroundColor: '#93BEDF',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              // borderRadius: '20px',
              height: '100%',
              backgroundColor: '#f5f5f6',
            }}
          >
            {' '}
            <div
              className='row'
              style={{ width: '100%', height: '100%', margin: '0px' }}
            >
              <div className='col-1 p-0' style={{ height: '100%' }}>
                <Header />
              </div>
              <div className='col-11' style={{ width: '100%' }}>
                <div className='container' style={{ padding: '15% 20%' }}>
                  <h1>New Post</h1>
                  <Form onSubmit={this.onSubmit}>
                    <Label style={{ margin: '0' }}>Caption</Label>
                    <FormControl
                      type='text'
                      className='mr-sm-1'
                      id='description'
                      onChange={this.onChange}
                      value={this.state.description}
                    />

                    <Label style={{ margin: '0' }}>Image</Label>
                    <div className='row w-100' style={{ paddingLeft: '18px' }}>
                      <div className='col-11 p-0'>
                        <FormControl
                          type='file'
                          className='mr-sm-1'
                          id='Image'
                          onChange={this.onClick}
                        />
                      </div>
                      <div className='col-1'>{this.state.loading}</div>
                    </div>
                    <button
                      className='btn'
                      style={{
                        color: 'white',
                        backgroundColor: '#248bc7',
                        border: '0',
                        borderRadius: '20px',
                      }}
                      variant='outline-success'
                      type='submit'
                    >
                      Post
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
