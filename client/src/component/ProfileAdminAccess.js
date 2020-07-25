import React, { Component } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import Loading from './Loading';
import { Image, Button, Card, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Posts from './Posts';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { deactivate } from '../redux/ActionCreater';
import { update } from '../redux/ActionCreater';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
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
    };
    this.showUser = this.showUser.bind(this);
    this.showData = this.showData.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleDeactivate = this.toggleDeactivate.bind(this);
    this.onDeacivateSubmit = this.onDeacivateSubmit.bind(this);
    this.StatusButton = this.StatusButton.bind(this);
    this.ChangeStatus = this.ChangeStatus.bind(this);
  }
  componentDidMount() {
    console.log(this);
    this.setState({
      ...this.state,
      user: this.props.user,
      image:
        'data:image/png;base64,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',
      name: this.props.user.name,
      description: this.props.user.description,
      city: this.props.user.city,
    });
  }

  redirect() {
    this.setState({
      ...this.state,
      editModal: !this.state.editModal,
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
    };
    this.props.update(body);
    console.log(this.state);
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
          <Button
            className='m-0 p-0'
            variant='danger'
            style={{
              marginTop: '10px',
              width: '100%',
              height: '25px',
            }}
            onClick={this.toggleDeactivate}
          >
            DeActivate Account
          </Button>
        );
      } else {
        return (
          <Button
            className='m-0 p-0'
            variant='success'
            style={{
              marginTop: '10px',
              width: '100%',
              height: '25px',
            }}
            onClick={this.toggleDeactivate}
          >
            Activate Account
          </Button>
        );
      }
    }
  }

  showUser() {
    return (
      <div>
        <Card style={{ color: '#212E36' }}>
          <Card.Img
            variant='top'
            src='data:image/png;base64,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'
          />
          <Card.Body style={{ margin: '0' }}>
            <Card.Title>{this.state.user.name}</Card.Title>
            <p>
              {' '}
              <i className='fas fa-info-circle'></i>{' '}
              {this.state.user.description}
            </p>
            <div className='row'>
              <Button
                className='m-0 p-0'
                style={{
                  backgroundColor: 'grey',
                  width: '100%',
                  height: '25px',
                }}
                onClick={this.redirect}
              >
                Edit Profile
              </Button>
            </div>
            <div className='row' style={{ marginTop: '5px' }}>
              {this.StatusButton()}
            </div>
          </Card.Body>
          <Card.Footer>
            <div className='row pt-4'>
              <div className='col-10 offset-1'>
                <i className='fas fa-map-marker-alt'></i> {this.state.user.city}
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

  showData() {
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
              <Button variant='danger' onClick={this.onDeacivateSubmit}>
                YES
              </Button>
              <Button variant='success' onClick={this.toggleDeactivate}>
                NO
              </Button>
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
              <Button variant='success' onClick={this.onDeacivateSubmit}>
                YES
              </Button>
              <Button variant='danger' onClick={this.toggleDeactivate}>
                NO
              </Button>
            </ModalBody>
          </Modal>
        );
      }
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
        <div style={{ height: '100%', width: '100%', marginTop: '50px' }}>
          <Modal
            isOpen={this.state.editModal}
            toggle={this.redirect}
            centered
            style={{ color: '#212E36' }}
          >
            <ModalHeader toggle={this.redirect}>Update Profile</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <Label htmlFor='Comment'>Name</Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='name'
                  value={this.state.name}
                  onChange={this.onChange}
                />

                <Label htmlFor='Comment'>Bio</Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='description'
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <Label htmlFor='Comment'>City</Label>
                <FormControl
                  type='text'
                  className='mr-sm-1'
                  id='city'
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <Button variant='outline-success' type='submit'>
                  Update
                </Button>
                <Button onClick={this.redirect} variant='outline-danger'>
                  CANCEL
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          {this.ChangeStatus()}
          <div className='d-xl-none' style={{ height: '100%' }}>
            <HeaderMobile />
            <div style={{ marginTop: '75px', width: '100%' }}>
              <div className='row'>
                <div className='col-5'>
                  <Image
                    width='65%'
                    height='70%'
                    style={{ minWidth: '20%' }}
                    src='data:image/png;base64,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'
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
              <h4>{this.state.user.name}</h4>
              <div style={{ paddingLeft: '2px' }}>
                <p>
                  {' '}
                  <i className='fas fa-info-circle'></i>{' '}
                  {this.state.user.description}
                </p>
                <i className='fas fa-map-marker-alt'></i> {this.state.user.city}
                <div className='row'>
                  <Button
                    className='m-0 p-0'
                    style={{
                      backgroundColor: 'grey',
                      width: '100%',
                      height: '25px',
                    }}
                    onClick={this.redirect}
                  >
                    Edit Profile
                  </Button>
                </div>
                <div className='row' style={{ marginTop: '5px' }}>
                  {this.StatusButton()}{' '}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '70px' }}>{this.showData()}</div>
            <FooterMobile />
          </div>
          <div className='d-none d-xl-block '>
            <Header />
            <h1>Admin Access Only</h1>
            <div className='row'>
              <div className='col-2 pl-5 pt-5' style={{ height: '100%' }}>
                {this.showUser()}
              </div>
              <div
                className='col-8 pt-5'
                style={{
                  height: '100%',
                }}
              >
                {this.showData()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdminAccess);
