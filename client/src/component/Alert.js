import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.toggleShow = this.toggleShow.bind(this);
  }
  toggleShow() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <Toast
        className={this.props.cls}
        style={{ marginLeft: this.props.ml, zIndex: '1', marginTop: '65px' }}
        show={this.state.show}
        onClose={this.toggleShow}
      >
        <Toast.Header>
          <strong className='mr-auto'>{this.props.heading}</strong>
          <small>now</small>
        </Toast.Header>

        <h4>{this.props.message}</h4>
      </Toast>
    );
  }
}
export default Alert;
