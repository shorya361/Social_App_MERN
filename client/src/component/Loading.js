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
      <div style={{ height: '100%' }}>
        <div
          className='d-xl-none'
          // style={{ height: '40%' }}
        >
          <HeaderMobile />
          <div className='row ' style={{ width: '100%', marginTop: '75px' }}>
            <div className='col-2 offset-5'>
              <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
              <p style={{ margin: '0' }}>loading...</p>
            </div>
          </div>
          <FooterMobile />
        </div>
        <div
          className='d-none d-xl-block  '
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
            <Header />
            <div className='row' style={{ width: '100%', height: '100%' }}>
              <div className='col-2 offset-5' style={{ height: '100%' }}>
                <span className='fa fa-spinner fa-pulse fa-3x fa-fw '></span>
                <p style={{ margin: '0', width: 'fit-content' }}>loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Loading);
