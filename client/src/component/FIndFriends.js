import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import Loading from './Loading';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';
import { Card, Image, CardGroup, Nav } from 'react-bootstrap';
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
                className='col-3 p-0'
                style={{ margin: '0 2%' }}
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
                <Card>
                  <Card.Body style={{ padding: '0' }}>
                    <div className='row w-100 m-0'>
                      <div className='col-2' style={{ padding: '2%' }}>
                        {' '}
                        <Image
                          src={each.image}
                          height='96%'
                          width='96%'
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
                                style={{ margin: '0', textAlign: 'left' }}
                              >
                                {each.name}
                              </Card.Title>
                            </div>

                            <div className='row w-100'>
                              <Card.Text>{each.description}</Card.Text>
                            </div>
                          </Nav.Link>
                        </Nav>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
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
          <div style={{ marginTop: '75px' }}>
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
                      className='container '
                      style={{ margin: '0', paddingTop: '3%' }}
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
