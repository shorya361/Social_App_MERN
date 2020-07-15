import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#646665',
        }}
      >
        <p>Copyright@: Shorya Upadhayay</p>
      </div>
    );
  }
}
export default Footer;
