import React, { Component } from 'react';
import axios from 'axios';
import {
  Form,
  NavDropdown,
  Nav,
  FormControl,
  Image,
  Card,
} from 'react-bootstrap';
import { Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Comment from './Comment';
import {
  addNewComment,
  updatePost,
  deletePost,
  Like,
  UnLike,
  DownVote,
  UnDownVote,
  getTimeline,
} from '../redux/ActionCreater';
const mapStateToProps = (state) => {
  return {
    Comments: state.Comments,
    Auth: state.Auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addNewComment: (body) => {
    dispatch(addNewComment(body));
  },
  updatePost: (body) => {
    dispatch(updatePost(body));
  },
  deletePost: (body) => {
    dispatch(deletePost(body));
  },
  Like: (body) => {
    dispatch(Like(body));
  },
  UnLike: (body) => {
    dispatch(UnLike(body));
  },
  DownVote: (body) => {
    dispatch(DownVote(body));
  },

  UnDownVote: (body) => {
    dispatch(UnDownVote(body));
  },
  getTimeline: (body) => dispatch(getTimeline(body)),
});

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      newcomment: '',
      DeletePost: false,
      UpdatePost: false,
      description: '',
      uploadedImage: null,
      loading: null,
      buttons: (
        <div
          className='row'
          style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
        >
          <Nav>
            <Nav.Link
              onClick={this.LikePost}
              style={{ color: 'black', paddingLeft: '0' }}
            >
              <i className='fas fa-arrow-circle-up'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.DownVote}>
              <i className='fas fa-arrow-circle-down'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
              <i className='far fa-comment'></i>
            </Nav.Link>
          </Nav>
        </div>
      ),
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleDeletePost = this.toggleDeletePost.bind(this);
    this.toggleUpdatePost = this.toggleUpdatePost.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onDeletePost = this.onDeletePost.bind(this);
    this.LikePost = this.LikePost.bind(this);
    this.DisLikePost = this.DisLikePost.bind(this);
    this.DownVoteCall = this.DownVoteCall.bind(this);
    this.UnDownVoteCall = this.UnDownVoteCall.bind(this);
    this.onClick = this.onClick.bind(this);
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
  componentDidMount() {
    if (this.props.postDetails && this.props.Auth.user) {
      // console.log(this.props.postDetails.description);
      this.setState({
        ...this.state,
        description: this.props.postDetails.description,
        uploadedImage: this.props.postDetails.image,
      });
      // console.log(this.state);
    }
    let isLiked = this.props.Auth.user.Likes.indexOf(
      this.props.postDetails._id
    );
    if (isLiked !== -1) {
      this.setState({
        ...this.state,
        buttons: (
          <div
            className='row'
            style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
          >
            <Nav>
              <Nav.Link
                onClick={this.DisLikePost}
                style={{ color: 'red', paddingLeft: '0' }}
              >
                <i className='fas fa-arrow-circle-up'></i> {this.state.likes}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
                <i className='fas fa-arrow-circle-down'></i>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
                <i className='far fa-comment'></i>
              </Nav.Link>
            </Nav>
          </div>
        ),
      });
    }

    let isDisLiked = this.props.Auth.user.Dislikes.indexOf(
      this.props.postDetails._id
    );
    if (isDisLiked !== -1) {
      this.setState({
        ...this.state,
        buttons: (
          <div
            className='row'
            style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
          >
            <Nav>
              <Nav.Link
                onClick={this.LikePost}
                style={{ color: 'black', paddingLeft: '0' }}
              >
                <i className='fas fa-arrow-circle-up'></i>{' '}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'red' }} onClick={this.UnDownVoteCall}>
                <i className='fas fa-arrow-circle-down'></i>
                {this.state.dislikes}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
                <i className='far fa-comment'></i>
              </Nav.Link>
            </Nav>
          </div>
        ),
      });
    }
    // console.log(this);
  }
  componentWillReceiveProps(props) {
    // console.log('hi');

    let isLiked = props.Auth.user.Likes.indexOf(this.props.postDetails._id);
    if (isLiked !== -1) {
      this.setState({
        ...this.state,
        buttons: (
          <div
            className='row'
            style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
          >
            <Nav>
              <Nav.Link
                onClick={this.DisLikePost}
                style={{ color: 'red', paddingLeft: '0' }}
              >
                <i className='fas fa-arrow-circle-up'></i>{' '}
                {props.postDetails.Likes.length}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
                <i className='fas fa-arrow-circle-down'></i>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
                <i className='far fa-comment'></i>
              </Nav.Link>
            </Nav>
          </div>
        ),
      });
    } else {
      this.setState({
        ...this.state,
        buttons: (
          <div
            className='row'
            style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
          >
            <Nav>
              <Nav.Link
                onClick={this.LikePost}
                style={{ color: 'black', paddingLeft: '0' }}
              >
                <i className='fas fa-arrow-circle-up'></i>{' '}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
                <i className='fas fa-arrow-circle-down'></i>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
                <i className='far fa-comment'></i>
              </Nav.Link>
            </Nav>
          </div>
        ),
      });
    }
    let isDisLiked = props.Auth.user.Dislikes.indexOf(props.postDetails._id);
    if (isDisLiked !== -1) {
      this.setState({
        ...this.state,
        buttons: (
          <div
            className='row'
            style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
          >
            <Nav>
              <Nav.Link
                onClick={this.LikePost}
                style={{ color: 'black', paddingLeft: '0' }}
              >
                <i className='fas fa-arrow-circle-up'></i>{' '}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'red' }} onClick={this.UnDownVoteCall}>
                <i className='fas fa-arrow-circle-down'></i>
                {props.postDetails.Dislikes.length}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
                <i className='far fa-comment'></i>
              </Nav.Link>
            </Nav>
          </div>
        ),
      });
    }
  }

  LikePost = () => {
    let body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.Like(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);
    this.setState({
      ...this.state,
      likes: this.state.likes + 1,
      buttons: (
        <div
          className='row'
          style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
        >
          <Nav>
            <Nav.Link
              onClick={this.DisLikePost}
              style={{ color: 'red', paddingLeft: '0' }}
            >
              <i className='fas fa-arrow-circle-up'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
              <i className='fas fa-arrow-circle-down'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
              <i className='far fa-comment'></i>
            </Nav.Link>
          </Nav>
        </div>
      ),
    });
  };
  DisLikePost = () => {
    let body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.UnLike(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);
    this.setState({
      ...this.state,
      buttons: (
        <div
          className='row'
          style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
        >
          <Nav>
            <Nav.Link
              onClick={this.LikePost}
              style={{ color: 'black', paddingLeft: '0' }}
            >
              <i className='fas fa-arrow-circle-up'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
              <i className='fas fa-arrow-circle-down'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
              <i className='far fa-comment'></i>
            </Nav.Link>
          </Nav>
        </div>
      ),
    });
  };

  DownVoteCall() {
    console.log(this);
    let body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.DownVote(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);
    this.setState({
      ...this.state,
      dislikes: this.state.dislikes + 1,
      buttons: (
        <div
          className='row'
          style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
        >
          <Nav>
            <Nav.Link
              onClick={this.LikePost}
              style={{ color: 'black', paddingLeft: '0' }}
            >
              <i className='fas fa-arrow-circle-up'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'red' }} onClick={this.UnDownVoteCall}>
              <i className='fas fa-arrow-circle-down'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
              <i className='far fa-comment'></i>
            </Nav.Link>
          </Nav>
        </div>
      ),
    });
  }
  UnDownVoteCall() {
    let body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.UnDownVote(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);
    this.setState({
      ...this.state,
      buttons: (
        <div
          className='row'
          style={{ width: '100%', margin: 'auto', paddingLeft: '1.25rem' }}
        >
          <Nav>
            <Nav.Link
              onClick={this.LikePost}
              style={{ color: 'black', paddingLeft: '0' }}
            >
              <i className='fas fa-arrow-circle-up'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.DownVoteCall}>
              <i className='fas fa-arrow-circle-down'></i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'black' }} onClick={this.toggleShow}>
              <i className='far fa-comment'></i>
            </Nav.Link>
          </Nav>
        </div>
      ),
    });
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  toggleShow = () => {
    this.setState({
      ...this.state,
      show: !this.state.show,
    });
  };

  toggleDeletePost() {
    this.setState({
      ...this.state,
      DeletePost: !this.state.DeletePost,
    });
    // console.log(this);
  }
  toggleUpdatePost() {
    this.setState({
      ...this.state,
      UpdatePost: !this.state.UpdatePost,
    });
  }
  onCommentSubmit = (e) => {
    e.preventDefault();
    let body = {
      Post: this.props.postDetails._id,
      UserId: this.props.Auth.user._id,
      comment: this.state.newcomment,
    };
    this.props.addNewComment(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);

    this.setState({
      ...this.state,
      newcomment: '',
    });
  };

  onEditSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    var img = null;
    if (this.state.uploadedImage === null) {
      img = this.props.postDetails.image;
    } else {
      img = this.state.uploadedImage;
    }
    let body = {
      name: '',
      image: img,
      description: this.state.description,
      PostID: this.props.postDetails._id,
    };
    this.props.updatePost(body);
    // body = {
    //   UserID: this.props.Auth.user._id,
    // };
    // this.props.getTimeline(body);
    this.setState({
      ...this.state,
      description: this.props.postDetails.description,
      uploadedImage: this.props.postDetails.image,
    });
  }

  onDeletePost() {
    this.toggleDeletePost();
    let body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.deletePost(body);
    //   body = {
    //     UserID: this.props.Auth.user._id,
    //   };
    //   this.props.getTimeline(body);
  }

  ShowComment = () => {
    if (this.props.postDetails.comments.length === 0)
      var coments = <p style={{ paddingLeft: '5%' }}>No comments..</p>;
    else {
      if (this.props.postDetails && this.props.Comments.Comments) {
        coments = this.props.postDetails.comments.map((each) => {
          // console.log(this);
          var eachcomment = this.props.Comments.Comments.find(function (
            post,
            index
          ) {
            if (post._id === each) return post;
            else {
              return null;
            }
          });
          if (eachcomment) {
            return <Comment key={eachcomment._id} eachcomment={eachcomment} />;
          } else {
            return null;
          }
        });
      }
    }
    if (this.state.show === true) {
      return (
        <div style={{ paddingTop: '4px', backgroundColor: '#f5f5f6' }}>
          <div
            style={{
              borderRadius: '8px',
            }}
          >
            <h4 style={{ paddingLeft: '30%' }}>Comments</h4>
            {coments}
            <Form
              onSubmit={this.onCommentSubmit}
              style={{ marginTop: '5px', width: '96%', marginLeft: '2%' }}
            >
              <FormControl
                type='text'
                placeholder='Add Comment'
                className='mr-sm-1'
                id='newcomment'
                value={this.state.newcomment}
                onChange={this.onChange}
              />
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
                size='sm'
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      );
    }
  };
  render = () => {
    var option = null;

    if (
      this.props.postDetails.author.id === this.props.Auth.user._id ||
      this.props.Auth.user.isAdmin
    ) {
      option = (
        <Nav style={{ padding: '0', color: 'black' }}>
          <NavDropdown
            title='options'
            style={{ paddingLeft: 'auto', color: 'black' }}
          >
            <NavDropdown.Item onClick={this.toggleUpdatePost}>
              <i className='far fa-edit'></i>Update
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.toggleDeletePost}>
              <i className='far fa-trash-alt'></i>Delete
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }

    return (
      <div>
        <Modal
          isOpen={this.state.DeletePost}
          toggle={this.toggleDeletePost}
          centered
          style={{ color: '#212E36' }}
        >
          <ModalHeader toggle={this.toggleDeletePost}>
            Are You Sure , you want to delete this post ?
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
              variant='outline-danger'
              onClick={this.onDeletePost}
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
              variant='outline-success'
              onClick={this.toggleDeletePost}
            >
              NO
            </button>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.UpdatePost}
          toggle={this.toggleUpdatePost}
          centered
          style={{ color: '#212E36' }}
        >
          <ModalHeader toggle={this.toggleUpdatePost}>Update Post</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onEditSubmit}>
              <Label htmlFor='description' style={{ margin: '0' }}>
                Enter new caption
              </Label>

              <FormControl
                type='text'
                className='mr-sm-1'
                id='description'
                value={this.state.description}
                onChange={this.onChange}
              />
              <Label
                htmlFor='image'
                style={{ marginTop: '3px', marginBottom: '0px' }}
              >
                Change Image
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
                onClick={this.toggleUpdatePost}
              >
                Update
              </button>
            </Form>
          </ModalBody>
        </Modal>

        <div
          className='d-xl-none'
          style={{
            height: '100%',
            marginTop: '10px',
            color: '#F5F5F6',
          }}
        >
          <Card style={{ color: '#212e36' }}>
            <Card.Body>
              <div className='row' style={{ width: '100%' }}>
                <div className='col-3'>
                  <Image
                    roundedCircle
                    width={55}
                    height={55}
                    src={this.props.Auth.user.image}
                  />
                </div>
                <div
                  className='col-9'
                  style={{ padding: '0', paddingTop: '3%' }}
                >
                  <Nav.Link
                    style={{ color: 'black', padding: '0' }}
                    href={`/Userprofile/${this.props.postDetails.author.id}`}
                  >
                    <h4>{this.props.postDetails.author.username}</h4>
                  </Nav.Link>
                  {option}
                </div>
              </div>
              <h4 style={{ marginLeft: '2%' }}>
                {this.props.postDetails.description}
              </h4>

              <Image src={this.props.postDetails.image} fluid />
              <p style={{ margin: '0' }}>
                <Moment fromNow>{this.props.postDetails.created}</Moment>
              </p>
            </Card.Body>
            <Card.Footer style={{ padding: '0' }}>
              {this.state.buttons}
            </Card.Footer>

            {this.ShowComment()}
          </Card>
        </div>
        <div className='d-none d-xl-block '>
          <div
            style={{
              paddingBottom: '2px',
              paddingLeft: '14px',
            }}
          >
            <Card
              style={{
                // padding: '14px',
                color: '#212e36',
              }}
            >
              <Card.Body>
                <div className='row' style={{ width: '100%' }}>
                  <div className='col-1 p-0'>
                    {/* <img
                      width={64}
                      height={64}
                      className='m-auto'
                      src={this.props.Auth.user.image}
                    /> */}
                    <Image
                      width={64}
                      height={64}
                      src={this.props.Auth.user.image}
                      roundedCircle
                      style={{ margin: '17%' }}
                    />
                  </div>
                  <div className='col-9 p-0'>
                    <h3 style={{ marginBottom: '0', color: 'black' }}>
                      <Nav.Link
                        style={{ color: 'black', paddingTop: '3%' }}
                        href={`/Userprofile/${this.props.postDetails.author.id}`}
                      >
                        {this.props.postDetails.author.username}
                      </Nav.Link>
                    </h3>
                    {option}
                  </div>
                </div>

                <h5 style={{ paddingTop: '3px' }}>
                  {this.props.postDetails.description}
                </h5>
                <Card
                  style={{
                    width: '70%',
                    marginBottom: '3px',
                  }}
                >
                  <Card.Img src={this.props.postDetails.image} />
                </Card>
                <p style={{ margin: '0', marginTop: '5px' }}>
                  <Moment fromNow>{this.props.postDetails.created}</Moment>

                  {/* {this.props.postDetails.Likes.length} Upvotes{' '}
                  <i
                    className='fas fa-grip-lines-vertical'
                    style={{ marginLeft: '4px' }}
                  ></i>{' '}
                  {this.props.postDetails.Dislikes.length} Downvotes{' '}
                  <i
                    className='fas fa-grip-lines-vertical'
                    style={{ marginLeft: '4px' }}
                  ></i>{' '}
                  {this.props.postDetails.comments.length} Comments */}
                </p>
              </Card.Body>
              <Card.Footer style={{ padding: '0' }}>
                {this.state.buttons}
              </Card.Footer>
              {this.ShowComment()}
            </Card>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
