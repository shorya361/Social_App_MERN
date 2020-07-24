import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import Loading from './Loading';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';
import { Link } from 'react-router-dom';
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
        return (
          <div className='col-4'>
            <Card>
              <Card.Img variant='top' src={each.image} />
              <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title>{each.name}</Card.Title>
                <Card.Text>{each.description}</Card.Text>
              </Card.Body>
              <Button variant='info' href={`/Userprofile/${each._id}`}>
                View Profile
              </Button>
            </Card>
          </div>
        );
      });
      return users;
    }
  }
  ShowUsersMobile() {
    if (this.props.AllUsers.Users) {
      var users = this.props.AllUsers.Users.map((each) => {
        if (
          each._id !== this.props.Auth.user._id &&
          this.props.Auth.user.isAdmin
        ) {
          return (
            <div className='col-12' style={{ marginBottom: '5px' }}>
              <Card>
                <Card.Body style={{ textAlign: 'center', padding: '0' }}>
                  <div className='row w-100 m-0'>
                    <div className='col-2'></div>
                    <div className='col-6' style={{ paddingTop: '6px' }}>
                      <Nav>
                        <div className='row w-100'>
                          <Card.Title style={{ margin: '0' }}>
                            {each.name}
                          </Card.Title>
                        </div>

                        <div className='row w-100'>
                          <Card.Text>{each.description}</Card.Text>
                        </div>
                      </Nav>
                    </div>
                    <div className='col-3'>
                      <Nav>
                        <Button
                          variant='info'
                          size='sm'
                          href={`/Userprofile/${each._id}`}
                        >
                          View Profile
                        </Button>
                      </Nav>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        }
        if (each._id !== this.props.Auth.user._id && each.activated === true) {
          return (
            <div className='col-12' style={{ marginBottom: '5px' }}>
              <Card>
                <Card.Body style={{ textAlign: 'center', padding: '0' }}>
                  <div className='row w-100 m-0'>
                    <div className='col-2'></div>
                    <div className='col-6' style={{ paddingTop: '6px' }}>
                      <Nav>
                        <div className='row w-100'>
                          <Card.Title style={{ margin: '0' }}>
                            {each.name}
                          </Card.Title>
                        </div>

                        <div className='row w-100'>
                          <Card.Text>{each.description}</Card.Text>
                        </div>
                      </Nav>
                    </div>
                    <div className='col-3'>
                      <Nav>
                        <Button
                          variant='info'
                          size='sm'
                          href={`/Userprofile/${each._id}`}
                        >
                          View Profile
                        </Button>
                      </Nav>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        }
      });
      return users;
    }
  }

  render() {
    if (this.props.Auth.loading === true || !this.props.Auth.token) {
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
              <div className='row'> {this.ShowUsers()}</div>
            </div>
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FindFriends);
