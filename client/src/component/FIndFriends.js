import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import Loading from './Loading';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';
import { Card, Button, CardGroup, Nav } from 'react-bootstrap';
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
              <div key={each._id} className='col-4'>
                <Card>
                  <Card.Img variant='top' src={each.image} />
                  <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{each.name}</Card.Title>
                    <Card.Text>{each.description}</Card.Text>
                  </Card.Body>
                  <Button
                    variant='info'
                    href={`/Userprofile/${each._id}`}
                    style={{ height: '40px', borderRadius: '24px' }}
                  >
                    View Profile
                  </Button>
                </Card>
              </div>
            );
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
                      <div className='col-2'></div>
                      <div
                        className='col-10'
                        style={{ padding: '0', paddingTop: '6px' }}
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
      <div style={{ marginTop: '70px' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <h4 style={{ textAlign: 'center' }}>Add Friends</h4>
          {this.ShowUsersMobile()}
          <FooterMobile />
        </div>
        <div className='d-none d-xl-block '>
          <Header />
          <CardGroup>
            <div className='container'>
              <h2 style={{ textAlign: 'center' }}>Add Friends</h2>
              <div className='row' style={{ width: '100%' }}>
                {' '}
                {this.ShowUsers()}
              </div>
            </div>
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FindFriends);
