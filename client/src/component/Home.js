import React, { Component } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import { Card } from 'react-bootstrap';
import Alert from './Alert';
import { connect } from 'react-redux';
import Loading from './Loading';
import { getTimeline } from '../redux/ActionCreater';
import { Fade, Stagger } from 'react-animation-components';
import Posts from './Posts';
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Timeline: state.Timeline,
    Alert: state.Alert,
    Comments: state.Comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTimeline: (body) => dispatch(getTimeline(body)),
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.showUser = this.showUser.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.showData = this.showData.bind(this);
  }
  componentWillReceiveProps(Props) {
    if (Props.Auth.user) {
      // console.log(Props);
      // this.setState({
      //   name: Props.Auth.user.name,
      // });
      if (Props.Timeline.Post === null) {
        this.props.getTimeline({
          UserID: Props.Auth.user._id,
        });
      }
    }
  }
  showUser() {
    if (this.props.Auth.user) {
      return (
        <div>
          <Card style={{ color: '#212E36' }}>
            <Card.Img
              src={this.props.Auth.user.image}
              style={{ height: '350px' }}
            />
            <Card.Body>
              <Card.Title style={{ marginBottom: '0px' }}>
                {this.props.Auth.user.name}
              </Card.Title>
              <p>
                {' '}
                <i className='fas fa-info-circle'></i>{' '}
                {this.props.Auth.user.description}
              </p>
              <a href='/profile'>
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
                  View Profile
                </button>
              </a>
            </Card.Body>
            <Card.Footer>
              <i className='fas fa-map-marker-alt'></i>{' '}
              {this.props.Auth.user.city}
            </Card.Footer>
          </Card>
        </div>
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
  showData() {
    if (this.props.Auth.user && this.props.Timeline.Post) {
      // console.log(this.props.Auth.user.Posts);
      if (this.props.Timeline.Post.length > 0) {
        const posts = [];
        posts.push(
          this.props.Timeline.Post.map((eachPost) => {
            return (
              <Stagger in>
                <Fade in>
                  <Posts
                    key={eachPost._id}
                    user={this.props.Auth.user}
                    postDetails={eachPost}
                    // name={this.state.name}
                  />
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

  render() {
    if (
      this.props.Auth.loading === true ||
      !this.props.Auth.token
      // || !this.props.timeline.Post
    ) {
      return <Loading />;
    }
    return (
      <div style={{ height: '100%' }}>
        <div className='d-xl-none'>
          <HeaderMobile />
          <div style={{ marginTop: '75px', marginBottom: '75px' }}>
            {this.showData()}
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
                      style={{
                        height: '90px',
                        width: '100%',
                        paddingTop: '5%',
                      }}
                    >
                      {this.showAlert()}
                    </div>
                    <div>{this.showUser()}</div>
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>{' '}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
