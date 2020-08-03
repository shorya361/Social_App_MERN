import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import Header from './Header';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';
import { Image, Card } from 'react-bootstrap';
import Posts from './Posts';
import { Redirect } from 'react-router-dom';
import ProfileAdminAccess from './ProfileAdminAccess';
import { FollowRequest, UnFollowRequest } from '../redux/ActionCreater';
import Alert from './Alert';

import { Fade, Stagger } from 'react-animation-components';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    AllUsers: state.AllUsers,
    Alert: state.Alert,
  };
};

const mapDispatchToProps = (dispatch) => ({
  FollowRequest: (body) => dispatch(FollowRequest(body)),
  UnFollowRequest: (body) => dispatch(UnFollowRequest(body)),
});
class ProfileID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      button: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitUnfollow = this.onSubmitUnfollow.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }
  onSubmitUnfollow(e) {
    e.preventDefault();
    const body = {
      UserID: this.props.Auth.user._id,
      follow: this.state.user._id,
    };
    this.setState({
      ...this.state,
      button: (
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
          onClick={this.onSubmit}
        >
          Follow
        </button>
      ),
    });
    this.props.UnFollowRequest(body);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const body = {
      UserID: this.props.Auth.user._id,
      follow: this.state.user._id,
    };
    this.setState({
      ...this.state,
      button: (
        <button
          className='btn p-0'
          variant='danger'
          style={{
            color: 'white',
            backgroundColor: '#248bc7',
            width: '80%',

            marginLeft: '10%',
            height: '40px',
            border: '0',
            borderRadius: '20px',
          }}
          onClick={this.onSubmitUnfollow}
        >
          UnFollow
        </button>
      ),
    });
    this.props.FollowRequest(body);
  };
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // console.log(this);
    if (nextProps.AllUsers.Users) {
      nextProps.AllUsers.Users.forEach((eachUser) => {
        if (eachUser._id === this.props.userID) {
          this.setState({
            ...this.state,
            user: eachUser,
            button: (
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
                onClick={this.onSubmit}
              >
                Follow
              </button>
            ),
          });
          // console.log(nextProps);
          eachUser.Followers.forEach((each) => {
            // console.log(each, nextProps.Auth.user._id);
            if (this.props.Auth.user) {
              if (each === this.props.Auth.user._id) {
                // console.log('done');
                return this.setState({
                  ...this.state,
                  user: eachUser,

                  button: (
                    <button
                      className='btn p-0'
                      variant='danger'
                      style={{
                        color: 'white',
                        backgroundColor: '#248bc7',

                        width: '80%',
                        marginLeft: '10%',
                        height: '40px',
                        border: '0',
                        borderRadius: '20px',
                      }}
                      onClick={this.onSubmitUnfollow}
                    >
                      UnFollow
                    </button>
                  ),
                });
              }
            } else {
              return null;
            }
          });
        } else {
          return null;
        }
      });
    }
    //     console.log('hehe la lala');
    // console.log(this.state);
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

  showData() {
    if (this.state.user && this.state.user.Posts.length > 0) {
      const posts = this.state.user.Posts.map((eachPost) => {
        return (
          <Stagger in>
            <Fade in>
              <Posts
                key={eachPost._id}
                user={this.state.user}
                postDetails={eachPost}
              />
            </Fade>
          </Stagger>
        );
      });
      return posts;
    } else {
      return (
        <h3
          style={{
            textAlign: 'center',
            paddingLeft: 'auto',
            paddingTop: 'auto',
          }}
        >
          No Posts yet
        </h3>
      );
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
              <div className='row' style={{ width: '100%', margin: '0' }}>
                {this.state.button}
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

  render() {
    if (
      this.props.Auth.loading === true ||
      !this.props.Auth.token ||
      this.state.user === null
    ) {
      return <Loading />;
    }
    if (this.props.Auth.user) {
      if (this.props.userID === this.props.Auth.user._id) {
        // this.props.history.push('/Profile');
        return <Redirect to='/Profile' />;
      }
      if (this.props.Auth.user.isAdmin) {
        return <ProfileAdminAccess user={this.state.user} />;
      }
    }
    return (
      <div style={{ height: '100%' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div style={{ width: '100%', marginTop: '70px' }}>
            <div className='row' style={{ width: '100%' }}>
              <div className='col-5' style={{ paddingLeft: '10%' }}>
                <Image
                  width='70px'
                  height='70px'
                  style={{ minWidth: '20%', marginTop: '8%', marginLeft: '8%' }}
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
              <div className='row' style={{ width: '90%', marginLeft: '5%' }}>
                {this.state.button}
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
              <div className='col-11' style={{ width: '100%' }}>
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
            </div>{' '}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileID);
