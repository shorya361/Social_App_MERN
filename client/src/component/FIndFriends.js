import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import Loading from './Loading';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';
import { Card, Image, CardGroup, Nav } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    AllUsers: state.AllUsers,
  };
};

class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.ShowUsers = this.ShowUsers.bind(this);
    this.ShowUsersMobile = this.ShowUsersMobile.bind(this);
  }
  ShowUsers() {
    if (this.props.AllUsers.Users) {
      var users = this.props.AllUsers.Users.map((each) => {
        if (each._id !== this.props.Auth.user._id) {
          if (this.props.Auth.user.isAdmin || each.activated === true) {
            return (
              <div
                key={each._id}
                className='col-2 p-0'
                style={{ margin: '1% 4%' }}
              >
                <FadeTransform
                  in
                  transformProps={{
                    exitTransform: 'scale(0.5) translatey(-50%)',
                  }}
                >
                  <Card style={{ height: '100%', width: '250px' }}>
                    <Image
                      variant='top'
                      src={each.image}
                      roundedCircle
                      style={{
                        height: '200px',
                        width: '200px',
                        margin: 'auto',
                        marginTop: '5%',
                      }}
                    />
                    <Card.Body style={{ textAlign: 'center', padding: '10px' }}>
                      <Card.Title>{each.name}</Card.Title>
                      <Card.Text>{each.description}</Card.Text>
                    </Card.Body>
                    <a
                      href={`/Userprofile/${each._id}`}
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                      }}
                    >
                      <button
                        className='btn'
                        style={{
                          height: '40px',
                          border: '0',
                          borderRadius: '20px',

                          color: 'white',
                          backgroundColor: '#248bc7',
                        }}
                        // href={`/Userprofile/${each._id}`}
                      >
                        View Profile
                      </button>
                    </a>
                  </Card>
                </FadeTransform>
              </div>
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
    }
    return users;
  }

  ShowUsersMobile() {
    if (this.props.AllUsers.Users) {
      var users = this.props.AllUsers.Users.map((each) => {
        if (each._id !== this.props.Auth.user._id) {
          if (this.props.Auth.user.isAdmin || each.activated === true) {
            return (
              <div
                key={each._id}
                className='col-12'
                style={{ marginBottom: '5px' }}
              >
                <FadeTransform
                  in
                  transformProps={{
                    exitTransform: 'scale(0.5) translatey(-50%)',
                  }}
                >
                  <Card>
                    <Card.Body style={{ padding: '0' }}>
                      <div className='row w-100 m-0'>
                        <div className='col-2' style={{ padding: '2%' }}>
                          {' '}
                          <Image
                            src={each.image}
                            height='70px'
                            width='70px'
                            roundedCircle
                            // style={{ marginTop: '15px' }}
                          />
                        </div>
                        <div
                          className='col-10'
                          style={{
                            padding: '0',
                            // paddingTop: '4%',
                            alignSelf: 'center',
                          }}
                        >
                          <Nav>
                            <Nav.Link
                              href={`/Userprofile/${each._id}`}
                              style={{ width: '100%', color: 'black' }}
                            >
                              <div className='row w-100'>
                                <Card.Title
                                  style={{
                                    margin: '0',
                                    textAlign: 'left',
                                    paddingLeft: '15%',
                                  }}
                                >
                                  {each.name}
                                </Card.Title>
                              </div>

                              <div className='row w-100'>
                                <Card.Text style={{ paddingLeft: '15%' }}>
                                  {each.description}
                                </Card.Text>
                              </div>
                            </Nav.Link>
                          </Nav>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </FadeTransform>
              </div>
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
      return users;
    } else {
      return null;
    }
  }

  render() {
    if (
      this.props.Auth.loading === true ||
      !this.props.Auth.token ||
      !this.props.AllUsers.Users
    ) {
      return <Loading />;
    }
    return (
      <div style={{ height: '100%' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div style={{ marginTop: '75px', marginBottom: '70px' }}>
            <h4 style={{ textAlign: 'center' }}>Add Friends</h4>
            {this.ShowUsersMobile()}
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
                <h2 style={{ textAlign: 'center' }}>Add Friends</h2>
                <div
                  className='scrollbar'
                  style={{ height: '680px', width: '100%', overflowX: 'auto' }}
                >
                  <CardGroup>
                    <div
                      style={{ margin: '0', width: '100%', paddingTop: '1%' }}
                    >
                      <div className='row' style={{ width: '100%' }}>
                        {' '}
                        {this.ShowUsers()}
                      </div>
                    </div>
                  </CardGroup>
                </div>
              </div>
            </div>{' '}
          </div>{' '}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FindFriends);
