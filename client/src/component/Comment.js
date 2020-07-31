import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Nav,
  Form,
  FormControl,
  Card,
  Image,
} from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { updateComment, deleteComment } from '../redux/ActionCreater';
const mapStateToProps = (state) => {
  return {
    Comments: state.Comments,
    Auth: state.Auth,
    AllUsers: state.AllUsers,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateComment: (body) => dispatch(updateComment(body)),
  deleteComment: (body) => dispatch(deleteComment(body)),
});
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOption: false,
      DeleteModal: false,
      EditModal: false,
      text: '',
    };
    this.onClic = this.onClic.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleUpdateComment = this.toggleUpdateComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.AllUsers.Users && this.props.eachcomment) {
      this.setState({
        ...this.state,
        text: this.props.eachcomment.text,
      });
      // console.log(user);
      // console.log(this.state);
    }
  }
  componentWillReceiveProps(props) {
    if (props.AllUsers.Users && props.eachcomment) {
      this.setState({
        ...this.state,
        text: props.eachcomment.text,
      });
    }
  }
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  onClic() {
    this.setState({
      ...this.state,
      isOption: !this.state.isOption,
    });
  }
  toggleDelete() {
    this.setState({
      ...this.state,
      isOption: false,
      DeleteModal: !this.state.DeleteModal,
      EditModal: false,
    });
  }
  toggleUpdateComment() {
    this.setState({
      ...this.state,
      isOption: false,
      DeleteModal: false,
      EditModal: !this.state.EditModal,
      text: this.props.eachcomment.text,
    });
  }
  onDeleteSubmit(e) {
    e.preventDefault();
    this.toggleDelete();
    const body = {
      comment: this.props.eachcomment._id,
    };
    this.props.deleteComment(body);
  }
  onSubmit = (e) => {
    e.preventDefault();

    const body = {
      comment: this.state.text,
      commentID: this.props.eachcomment._id,
    };
    this.props.updateComment(body);

    this.setState({
      ...this.state,
      text: this.props.eachcomment.text,

      EditModal: !this.state.EditModal,
    });
  };

  render() {
    if (this.props.eachcomment) {
      var option = null;
      if (
        this.props.eachcomment.author.id === this.props.Auth.user._id ||
        this.props.Auth.user.isAdmin === true
      ) {
        option = <i className='fas fa-ellipsis-v'></i>;
      }

      return (
        <div>
          <div className='d-xl-none'>
            <Modal
              isOpen={this.state.isOption}
              toggle={this.onClic}
              centered
              style={{ color: '#212E36' }}
            >
              <ModalBody style={{ padding: '0' }}>
                <ListGroup>
                  <ListGroup.Item onClick={this.toggleUpdateComment}>
                    <i className='far fa-edit'>Edit Comment</i>
                  </ListGroup.Item>
                  <ListGroup.Item onClick={this.toggleDelete}>
                    <i className='far fa-trash-alt'>Delete Comment</i>
                  </ListGroup.Item>
                </ListGroup>
              </ModalBody>
            </Modal>
            <Modal
              isOpen={this.state.DeleteModal}
              toggle={this.toggleDelete}
              centered
              style={{ color: '#212E36' }}
            >
              <ModalHeader toggle={this.toggleDelete}>
                Are You Sure , you want to delete this Comment ?
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
                  onClick={this.onDeleteSubmit}
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
                  onClick={this.toggleDelete}
                >
                  NO
                </button>
              </ModalBody>
            </Modal>
            <Modal
              isOpen={this.state.EditModal}
              toggle={this.toggleUpdateComment}
              centered
              style={{ color: '#212E36' }}
            >
              <ModalHeader toggle={this.toggleUpdateComment}>
                Update Comment
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmit}>
                  <Label htmlFor='Comment'>Comment</Label>
                  <FormControl
                    type='text'
                    className='mr-sm-1'
                    id='text'
                    value={this.state.text}
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
                  >
                    Update
                  </button>
                </Form>
              </ModalBody>
            </Modal>
            <Card style={{ margin: '5px 0px', marginLeft: '2%', width: '96%' }}>
              <Card.Body style={{ padding: '0' }}>
                <div className='row w-100 m-0'>
                  <div
                    className='col-2'
                    style={{ padding: '2%', alignSelf: 'center' }}
                  >
                    {' '}
                    <Image
                      src={this.props.eachcomment.author.image}
                      height='50px'
                      width='50px'
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
                    <Nav style={{ padding: '5%', paddingLeft: '8%' }}>
                      <div className='row w-100'>
                        <Card.Title style={{ margin: '0', textAlign: 'left' }}>
                          <a
                            href={`/Userprofile/${this.props.eachcomment.author.id}`}
                            style={{ color: 'black' }}
                          >
                            {this.props.eachcomment.author.username}
                          </a>
                        </Card.Title>
                      </div>

                      <div className='row w-100'>
                        <Card.Text> {this.props.eachcomment.text}</Card.Text>
                      </div>
                      <span
                        onClick={this.onClic}
                        style={{ justifyContent: 'end' }}
                      >
                        {option}
                      </span>
                    </Nav>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className='d-none d-xl-block'>
            <Card style={{ margin: '5px 0px', marginLeft: '2%', width: '96%' }}>
              <Card.Body style={{ padding: '0' }}>
                <div className='row w-100 m-0'>
                  <div className='col-1' style={{ padding: '2% 0px 2% 2%' }}>
                    {' '}
                    <Image
                      src={this.props.eachcomment.author.image}
                      height='50px'
                      width='50px'
                      roundedCircle
                      // style={{ marginTop: '15px' }}
                    />
                  </div>
                  <div
                    className='col-10'
                    style={{
                      padding: '0',
                      paddingLeft: '2%',
                      // paddingTop: '4%',
                    }}
                  >
                    <Nav style={{ padding: '2% 0px 1% 1%' }}>
                      <div className='row w-100'>
                        <Card.Title style={{ margin: '0', textAlign: 'left' }}>
                          <a
                            href={`/Userprofile/${this.props.eachcomment.author.id}`}
                            style={{ color: 'black' }}
                          >
                            {this.props.eachcomment.author.username}
                          </a>
                        </Card.Title>
                      </div>

                      <div className='row w-100'>
                        <Card.Text> {this.props.eachcomment.text}</Card.Text>
                      </div>
                      <span
                        onClick={this.onClic}
                        style={{ justifyContent: 'end' }}
                      >
                        <a href='#'>{option}</a>
                      </span>
                    </Nav>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
