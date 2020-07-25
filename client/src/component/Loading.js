import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import FooterMobile from './FooterMobile';
import HeaderMobile from './HeaderMobile';

const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
    Auth: state.Auth,
  };
};

class Loading extends Component {
  render() {
    return (
      <div style={{ marginTop: '150px' }}>
        <div
          className='d-xl-none'
          // style={{ height: '40%' }}
        >
          <HeaderMobile />
          <div className='row ' style={{ width: '100%' }}>
            <div className='col-2 offset-5'>
              <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
              <p style={{ margin: '0' }}>loading...</p>
            </div>
          </div>
          <FooterMobile />
        </div>
        <div className='d-none d-xl-block '>
          <Header />
          <div className='row' style={{ width: '100%' }}>
            <div className='col-2 offset-5' style={{ marginTop: '150px' }}>
              <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
              <p style={{ margin: '0', width: 'fit-content' }}>loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Loading);
