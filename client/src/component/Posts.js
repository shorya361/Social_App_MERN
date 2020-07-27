import React, { Component } from 'react';
import {
  Media,
  Navbar,
  Form,
  Button,
  NavDropdown,
  Nav,
  FormControl,
  Image,
  Card,
} from 'react-bootstrap';
import { Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { connect } from 'react-redux';
import Comment from './Comment';
import {
  addNewComment,
  updatePost,
  deletePost,
  Like,
  UnLike,
  DownVote,
  UnDownVote,
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
      image: '',
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
  }

  componentDidMount() {
    if (this.props.postDetails && this.props.Auth.user) {
      this.setState({
        ...this.state,
        description: this.props.postDetails.description,
        image: this.props.postDetails.image,
      });
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
                <i className='fas fa-arrow-circle-up'></i>{' '}
                {this.props.postDetails.Likes.length}
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
                {this.props.postDetails.Dislikes.length}
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
  componentWillReceiveProps(props) {
    // console.log(props);
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
    const body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.Like(body);
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
    const body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.UnLike(body);
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
    const body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.DownVote(body);
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
    const body = {
      Post: this.props.postDetails._id,
      UserID: this.props.Auth.user._id,
    };
    this.props.UnDownVote(body);
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
    console.log(this);
  }
  toggleUpdatePost() {
    this.setState({
      ...this.state,
      UpdatePost: !this.state.UpdatePost,
    });
  }
  onCommentSubmit = (e) => {
    e.preventDefault();
    const body = {
      Post: this.props.postDetails._id,
      UserId: this.props.Auth.user._id,
      comment: this.state.newcomment,
    };
    this.props.addNewComment(body);
    this.setState({
      ...this.state,
      newcomment: '',
    });
  };

  onEditSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const body = {
      name: '',
      image: this.state.image,
      description: this.state.description,
      PostID: this.props.postDetails._id,
    };
    this.props.updatePost(body);
    this.setState({
      ...this.state,
      description: this.props.postDetails.description,
      image: this.props.postDetails.image,
    });
  }

  onDeletePost() {
    this.toggleDeletePost();
    const body = { Post: this.props.postDetails._id };
    this.props.deletePost(body);
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
        <div style={{ paddingTop: '4px' }}>
          <div
            style={{
              backgroundColor: '# 6c757d',
              color: '#212E36',
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
              <Button variant='outline-success' type='submit' size='sm'>
                Submit
              </Button>
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
        <Nav style={{ padding: '0' }}>
          <NavDropdown title='options' style={{ paddingLeft: 'auto' }}>
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
            <Button variant='outline-danger' onClick={this.onDeletePost}>
              YES
            </Button>
            <Button variant='outline-success' onClick={this.toggleDeletePost}>
              NO
            </Button>
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
              <Label htmlFor='description'>Dscription</Label>

              <FormControl
                type='text'
                className='mr-sm-1'
                id='description'
                value={this.state.description}
                onChange={this.onChange}
              />
              <Label htmlFor='image' style={{ marginTop: '3px' }}>
                Image
              </Label>

              <FormControl
                type='text'
                className='mr-sm-1'
                id='iamge'
                value={this.state.image}
                onChange={this.onChange}
              />
              <Button
                variant='outline-success'
                type='submit'
                onClick={this.toggleUpdatePost}
              >
                Update
              </Button>
              <Button variant='outline-danger' onClick={this.toggleUpdatePost}>
                CANCEL
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <div
          className='d-xl-none'
          style={{
            height: '100%',
            marginTop: '10px',
            color: '#F5F5F6',
            // marginBottom: '70px',
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
                    src='data:image/png;base64,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'
                  />
                </div>
                <div className='col-9' style={{ padding: '0' }}>
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
              // marginBottom: '70px',
              marginTop: '10px',
              paddingLeft: '14px',
            }}
          >
            <Card
              style={{
                padding: '14px',
                color: '#212e36',
              }}
            >
              <Card.Body>
                <div className='row' style={{ width: '100%' }}>
                  <div className='col-2 p-0'>
                    <img
                      width={64}
                      height={64}
                      className='m-auto'
                      src='data:image/png;base64,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'
                      alt=''
                    />
                  </div>
                  <div className='col-9 p-0'>
                    <h3 style={{ marginBottom: '0' }}>
                      <Nav.Link
                        href={`/Userprofile/${this.props.postDetails.author.username._id}`}
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
                <p>
                  Created on :{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(
                    new Date(Date.parse(this.props.postDetails.created))
                  )}{' '}
                  <i
                    className='fas fa-grip-lines-vertical'
                    style={{ marginLeft: '4px' }}
                  ></i>{' '}
                  {this.props.postDetails.Likes.length} Upvotes{' '}
                  <i
                    className='fas fa-grip-lines-vertical'
                    style={{ marginLeft: '4px' }}
                  ></i>{' '}
                  {this.props.postDetails.Dislikes.length} Downvotes{' '}
                  <i
                    className='fas fa-grip-lines-vertical'
                    style={{ marginLeft: '4px' }}
                  ></i>{' '}
                  {this.props.postDetails.comments.length} Comments
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
