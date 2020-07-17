import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          bottom: '0',
          width: '100%',
          position: 'fixed',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#646665',
        }}
      >
        <p style={{ margin: 0 }}>Copyright@: Shorya Upadhayay</p>
      </div>
    );
  }
}
export default Footer;
