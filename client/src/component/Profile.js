import React, { Component } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import Loading from './Loading';
import { Image, Card, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Posts from './Posts';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { deactivate } from '../redux/ActionCreater';
import Alert from './Alert';
import { update } from '../redux/ActionCreater';
import axios from 'axios';
import { Fade, Stagger } from 'react-animation-components';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Alert: state.Alert,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deactivate: (body) => dispatch(deactivate(body)),
  update: (body) => dispatch(update(body)),
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      Deactivate: false,
      image: '',
      name: '',
      description: '',
      city: '',
      uploadedImage: '',
      loading: null,
    };
    this.onClick = this.onClick.bind(this);
    this.showUser = this.showUser.bind(this);
    this.showData = this.showData.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleDeactivate = this.toggleDeactivate.bind(this);
    this.onDeacivateSubmit = this.onDeacivateSubmit.bind(this);
    this.StatusButton = this.StatusButton.bind(this);
    this.ChangeStatus = this.ChangeStatus.bind(this);
    this.showAlert = this.showAlert.bind(this);
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
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // console.log(nextProps.Auth.user.image.toString());
    if (nextProps.Auth.user) {
      this.setState({
        ...this.state,
        image: nextProps.Auth.user.image,
        name: nextProps.Auth.user.name,
        description: nextProps.Auth.user.description,
        city: nextProps.Auth.user.city,
        uploadedImage: nextProps.Auth.user.image,
      });
    }
  }
  redirect() {
    this.setState({
      ...this.state,
      editModal: !this.state.editModal,
      loading: null,
    });
    // console.log(this.state);
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.redirect();
    const body = {
      userId: this.props.Auth.user._id,
      name: this.state.name,
      description: this.state.description,
      city: this.state.city,
      Image: this.state.uploadedImage,
      loading: null,
    };
    // console.log(body);
    this.props.update(body);
    // console.log(this.state);
  };
  toggleDeactivate() {
    this.setState({
      ...this.state,
      Deactivate: !this.state.Deactivate,
    });
  }
  onDeacivateSubmit() {
    this.toggleDeactivate();
    const body = {
      Profile: this.props.Auth.user._id,
    };
    this.props.deactivate(body);
  }

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  StatusButton() {
    if (this.props.Auth.user.activated) {
      return (
        <button
          className='btn m-0 p-0'
          variant='danger'
          style={{
            color: 'white',
            backgroundColor: '#248bc7',
            marginTop: '10px',
            width: '100%',
            height: '40px',
            border: '0',
            borderRadius: '20px',
          }}
          onClick={this.toggleDeactivate}
        >
          DeActivate Account
        </button>
      );
    } else {
      return (
        <button
          className='btn m-0 p-0'
          variant='success'
          style={{
            color: 'white',
            backgroundColor: '#248bc7',
            marginTop: '10px',
            width: '100%',
            height: '40px',
            border: '0',
            borderRadius: '20px',
          }}
          onClick={this.toggleDeactivate}
        >
          Activate Account
        </button>
      );
    }
  }

  showUser() {
    if (this.props.Auth.user) {
      return (
        <div style={{}}>
          <Card style={{ color: '#212E36' }}>
            <Card.Img
              variant='top'
              src={this.state.image}
              style={{ height: '350px' }}
            />
            <Card.Body style={{ margin: '0', padding: '0' }}>
              <Card.Title style={{ marginLeft: '9%', marginBottom: '0px' }}>
                {this.props.Auth.user.name}
              </Card.Title>
              <p style={{ marginLeft: '9%' }}>
                {' '}
                <i className='fas fa-info-circle'></i>{' '}
                {this.props.Auth.user.description}
              </p>
              <div
                className='row'
                style={{
                  width: '80%',
                  margin: '0px',
                  marginTop: '5px',
                  marginLeft: '10%',
                }}
              >
                <button
                  className='btn m-0 p-0'
                  style={{
                    color: 'white',
                    backgroundColor: '#248bc7',

                    width: '100%',
                    height: '40px',
                    border: '0',
                    borderRadius: '20px',
                  }}
                  onClick={this.redirect}
                >
                  Edit Profile
                </button>
              </div>
              <div
                className='row'
                style={{
                  width: '80%',
                  margin: '0px',
                  marginTop: '5px',
                  marginLeft: '10%',
                }}
              >
                {this.StatusButton()}
              </div>
            </Card.Body>
            <Card.Footer style={{ padding: '0' }}>
              <div className='row pt-4' style={{ marginLeft: '9%' }}>
                <div className='col-10 '>
                  <i className='fas fa-map-marker-alt'></i>{' '}
                  {this.props.Auth.user.city}
                </div>
                <div className='row pt-4'>
                  <div className='col-5 offset-1'>
                    <i className='fas fa-users'></i>{' '}
                    {this.props.Auth.user.Followers.length} Followers
                  </div>
                  <div className='col-5'>
                    <i className='fas fa-users'></i>{' '}
                    {this.props.Auth.user.Followings.length} Followings
                  </div>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
      );
    }
  }

  showData() {
    if (this.props.Auth.user) {
      // console.log(this.props.Auth.user.Posts);
      if (this.props.Auth.user.Posts.length > 0) {
        const posts = [];
        posts.push(
          this.props.Auth.user.Posts.map((eachPost) => {
            return (
              <Stagger in key={eachPost._id}>
                <Fade in>
                  <Posts user={this.state.user} postDetails={eachPost} />
                </Fade>
              </Stagger>
            );
          })
        );
        return posts;
      } else {
        return <h3>No Posts yet</h3>;
      }
    }
  }

  ChangeStatus() {
    if (this.props.Auth.user.activated) {
      return (
        <Modal
          isOpen={this.state.Deactivate}
          toggle={this.toggleDeactivate}
          centered
          style={{ color: '#212E36' }}
        >
          <ModalHeader toggle={this.toggleDeactivate}>
            Note: If you deactivate your account, You'll be a ghost for other
            except yours truly Admin.
          </ModalHeader>
          <ModalBody>
            <button
              className='btn'
              style={{
                color: 'white',
                backgroundColor: '#248bc7',
                border: '0',
                borderRadius: '20px',
              }}
              variant='danger'
              onClick={this.onDeacivateSubmit}
            >
              YES
            </button>
            <button
              className='btn'
              style={{
                color: 'white',
                backgroundColor: '#248bc7',
                border: '0',
                borderRadius: '20px',
              }}
              variant='success'
              onClick={this.toggleDeactivate}
            >
              NO
            </button>
          </ModalBody>
        </Modal>
      );
    } else {
      return (
        <Modal
          isOpen={this.state.Deactivate}
          toggle={this.toggleDeactivate}
          centered
          style={{ color: '#212E36' }}
        >
          <ModalHeader toggle={this.toggleDeactivate}>
            Activate Account
          </ModalHeader>
          <ModalBody>
            <button
              className='btn'
              style={{
                color: 'white',
                backgroundColor: '#248bc7',
                border: '0',
                borderRadius: '20px',
              }}
              variant='success'
              onClick={this.onDeacivateSubmit}
            >
              YES
            </button>
            <button
              className='btn'
              style={{
                color: 'white',
                backgroundColor: '#248bc7',
                border: '0',
                borderRadius: '20px',
              }}
              variant='danger'
              onClick={this.toggleDeactivate}
            >
              NO
            </button>
          </ModalBody>
        </Modal>
      );
    }
  }
  showAlert() {
    if (this.props.Alert.length > 0) {
      let heading = '';

      if (this.props.Alert[0].AlertType === 'danger') {
        heading = 'Sorry..';
      } else {
        heading = 'Congrats';
      }
      return (
        <Alert
          ml={'100%'}
          message={this.props.Alert[0].message}
          cls={'alert alert-'.concat(this.props.Alert[0].AlertType)}
          heading={heading}
        />
      );
    }
  }

  render() {
    if (this.props.Auth.loading === true || !this.props.Auth.token) {
      return <Loading />;
    }
    if (this.props.Auth.user) {
      return (
        <div style={{ height: '100%' }}>
          <Modal
            isOpen={this.state.editModal}
            toggle={this.redirect}
            centered
            style={{ color: '#212E36' }}
          >
            <ModalHeader toggle={this.redirect}>Update Profile</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <Label htmlFor='name' style={{ margin: '0', marginTop: '8px' }}>
                  Name
                </Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='name'
                  value={this.state.name}
                  onChange={this.onChange}
                />

                <Label
                  htmlFor='description'
                  style={{ margin: '0', marginTop: '8px' }}
                >
                  Bio
                </Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='description'
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <Label htmlFor='city' style={{ margin: '0', marginTop: '8px' }}>
                  City
                </Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='city'
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <Label
                  htmlFor='Image'
                  style={{ margin: '0', marginTop: '8px' }}
                >
                  Image
                </Label>
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
                  Update
                </button>
              </Form>
            </ModalBody>
          </Modal>
          {this.ChangeStatus()}
          <div className='d-xl-none' style={{ height: '100%' }}>
            <HeaderMobile />
            <div style={{ marginTop: '75px' }}>
              <div className='row' style={{ width: '100%' }}>
                <div className='col-5' style={{ paddingLeft: '10%' }}>
                  <Image
                    width='70px'
                    height='70px'
                    style={{
                      minWidth: '20%',
                      marginTop: '8%',
                      marginLeft: '8%',
                    }}
                    src={this.state.image}
                    roundedCircle
                  />
                </div>
                <div className='col-3' style={{ paddingTop: '5%' }}>
                  <i className='fas fa-users'></i>{' '}
                  {this.props.Auth.user.Followers.length} Followers
                </div>
                <div className='col-3' style={{ paddingTop: '5%' }}>
                  <i className='fas fa-users'></i>{' '}
                  {this.props.Auth.user.Followings.length} Followings
                </div>
              </div>
              <h4 style={{ marginLeft: '2%' }}>{this.props.Auth.user.name}</h4>
              <div style={{ marginLeft: '2%' }}>
                <p>
                  {' '}
                  <i className='fas fa-info-circle'></i>{' '}
                  {this.props.Auth.user.description}
                </p>
                <i className='fas fa-map-marker-alt'></i>{' '}
                {this.props.Auth.user.city}
                <div className='row' style={{ width: '90%', marginLeft: '5%' }}>
                  <button
                    className='btn m-0 p-0'
                    style={{
                      color: 'white',
                      backgroundColor: '#248bc7',
                      width: '100%',
                      height: '40px',
                      border: '0',
                      borderRadius: '20px',
                    }}
                    onClick={this.redirect}
                  >
                    Edit Profile
                  </button>
                </div>
                <div
                  className='row'
                  style={{ marginTop: '5px', width: '90%', marginLeft: '5%' }}
                >
                  {this.StatusButton()}{' '}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '70px' }}>{this.showData()}</div>
            <FooterMobile />
          </div>
          <div
            className='d-none d-xl-block  '
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
                width: '100%',
                backgroundColor: '#f5f5f6',
              }}
            >
              <div
                className='row'
                style={{ width: '100%', height: '100%', margin: '0px' }}
              >
                <div className='col-1 p-0' style={{ height: '100%' }}>
                  <Header />
                </div>
                <div className='col-11 p-0' style={{ height: '100%' }}>
                  <div
                    className='row'
                    style={{ width: '100%', height: '100%', margin: '0px' }}
                  >
                    <div
                      className='col-9'
                      style={{
                        paddingLeft: '0px',
                        paddingRight: '5%',
                      }}
                    >
                      <div
                        className='scrollbar'
                        style={{
                          height: '710px',
                          marginTop: '2%',
                          overflowY: 'auto',
                          paddingLeft: '0px',
                        }}
                      >
                        {this.showData()}
                      </div>
                    </div>
                    <div
                      className='col-3'
                      style={{
                        height: '100%',
                        width: '100%',
                        paddingLeft: '0px',
                        paddingRight: '60px',
                      }}
                    >
                      <div
                        className='row'
                        style={{ width: '100%', height: '100%' }}
                      >
                        <div
                          style={{
                            height: '2%',
                            width: '100%',
                            paddingTop: '5%',
                          }}
                        >
                          {this.showAlert()}
                        </div>
                        <div>{this.showUser()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
