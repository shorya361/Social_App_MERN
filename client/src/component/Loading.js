import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';

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
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div className='col-12 offset-5'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
            <p>loading...</p>
          </div>
          <FooterMobile />
        </div>
        <div className='d-none d-xl-block '>
          <Header />
          <div className='col-12 offset-5' style={{ marginTop: '150px' }}>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
            <p>loading...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Loading);
