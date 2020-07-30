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
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    AllUsers: state.AllUsers,
    Alert: state.Alert,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deactivate: (body) => dispatch(deactivate(body)),
  update: (body) => dispatch(update(body)),
});

class ProfileAdminAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      Deactivate: false,
      image: '',
      name: '',
      description: '',
      city: '',
      user: null,
      loading: null,
      uploadedImage: '',
    };
    this.showUser = this.showUser.bind(this);
    this.showData = this.showData.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleDeactivate = this.toggleDeactivate.bind(this);
    this.onDeacivateSubmit = this.onDeacivateSubmit.bind(this);
    this.StatusButton = this.StatusButton.bind(this);
    this.ChangeStatus = this.ChangeStatus.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    let TheUser = null;
    if (this.props.AllUsers) {
      this.props.AllUsers.Users.map((each) => {
        // console.log(each);
        if (each._id === this.props.user._id) {
          TheUser = each;
          // console.log('mil gya');
        }
        return null;
      });
    }

    this.setState({
      ...this.state,
      user: TheUser,
      image: TheUser.image,
      name: TheUser.name,
      description: TheUser.description,
      city: TheUser.city,
      uploadedImage: TheUser.image,
    });
    // console.log(this);
  }
  componentWillReceiveProps(Props) {
    console.log(Props);
    if (Props.user) {
      this.setState({
        ...this.state,
        user: Props.user,
        image: Props.user.image,
        name: Props.user.name,
        description: Props.user.description,
        city: Props.user.city,
        uploadedImage: Props.user.image,
      });
    }
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
      userId: this.state.user._id,
      name: this.state.name,
      description: this.state.description,
      city: this.state.city,
      Image: this.state.uploadedImage,
      loading: null,
    };
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
      Profile: this.state.user._id,
    };
    this.props.deactivate(body);
  }

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  StatusButton() {
    if (this.state.user) {
      if (this.state.user.activated) {
        return (
          <button
            className='btn p-0'
            variant='danger'
            style={{
              color: 'white',
              backgroundColor: '#248bc7',
              marginTop: '10px',
              width: '80%',
              marginLeft: '10%',
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
            className='btn p-0'
            variant='success'
            style={{
              color: 'white',
              backgroundColor: '#248bc7',
              marginTop: '10px',

              width: '80%',
              marginLeft: '10%',
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
  }

  showUser() {
    if (this.state.user) {
      return (
        <div>
          <Card style={{ color: '#212E36' }}>
            <Card.Img
              variant='top'
              src={this.state.user.image}
              style={{ height: '350px' }}
            />
            <Card.Body style={{ margin: '0', padding: '0' }}>
              <Card.Title style={{ marginLeft: '9%', marginBottom: '0px' }}>
                {this.state.user.name}
              </Card.Title>
              <p style={{ marginLeft: '9%' }}>
                {' '}
                <i className='fas fa-info-circle'></i>{' '}
                {this.state.user.description}
              </p>
              <div className='row' style={{ width: '90%', marginLeft: '5%' }}>
                <button
                  className='btn p-0'
                  style={{
                    color: 'white',
                    backgroundColor: '#248bc7',
                    width: '80%',
                    marginLeft: '10%',

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
                {this.StatusButton()}
              </div>
            </Card.Body>
            <Card.Footer style={{ padding: '0' }}>
              <div className='row pt-4' style={{ marginLeft: '9%' }}>
                <div className='col-10 '>
                  <i className='fas fa-map-marker-alt'></i>{' '}
                  {this.state.user.city}
                </div>
                <div className='row pt-4'>
                  <div className='col-5 offset-1'>
                    <i className='fas fa-users'></i>{' '}
                    {this.state.user.Followers.length} Followers
                  </div>
                  <div className='col-5'>
                    <i className='fas fa-users'></i>{' '}
                    {this.state.user.Followings.length} Followings
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
    if (this.state.user) {
      const posts = this.state.user.Posts.map((eachPost) => {
        return (
          <Posts
            key={eachPost._id}
            user={this.state.user}
            postDetails={eachPost}
          />
        );
      });
      return posts;
    }
  }

  ChangeStatus() {
    if (this.state.user) {
      if (this.state.user.activated) {
        return (
          <Modal
            isOpen={this.state.Deactivate}
            toggle={this.toggleDeactivate}
            centered
            style={{ color: '#212E36' }}
          >
            <ModalHeader toggle={this.toggleDeactivate}>
              Note: If you deactivate you account, You wont be able to see your
              friends' posts. And neither they can see yours.
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
    if (
      this.props.Auth.loading === true ||
      !this.props.Auth.token ||
      this.state.user === null
    ) {
      return <Loading />;
    }
    if (this.state.user) {
      return (
        <div style={{ height: '100%', width: '100%' }}>
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
            <div style={{ marginTop: '75px', width: '100%' }}>
              <div className='row' style={{ width: '100%' }}>
                <div className='col-5'>
                  <Image
                    width='65%'
                    height='70%'
                    style={{ minWidth: '20%', marginTop: '2%' }}
                    src={this.state.user.image}
                    roundedCircle
                  />
                </div>
                <div className='col-3' style={{ paddingTop: '5%' }}>
                  <i className='fas fa-users'></i>{' '}
                  {this.state.user.Followers.length} Followers
                </div>
                <div className='col-3' style={{ paddingTop: '5%' }}>
                  <i className='fas fa-users'></i>{' '}
                  {this.state.user.Followings.length} Followings
                </div>
              </div>
              <h4 style={{ marginLeft: '2%' }}>{this.state.user.name}</h4>
              <div style={{ marginLeft: '2%' }}>
                <p>
                  {' '}
                  <i className='fas fa-info-circle'></i>{' '}
                  {this.state.user.description}
                </p>
                <i className='fas fa-map-marker-alt'></i> {this.state.user.city}
                <div
                  className='row'
                  style={{ width: '80%', marginLeft: '14%' }}
                >
                  <button
                    className='btn m-0 p-0'
                    style={{
                      color: 'white',
                      backgroundColor: '#248bc7',

                      width: '90%',
                      marginLeft: '10%',
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
          </div>{' '}
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
            </div>{' '}
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdminAccess);
