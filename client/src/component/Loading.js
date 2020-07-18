import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import HeaderMobile from './HeaderMobile';
import FooterMobile from './FooterMobile';
import Footer from './footer';
const mapStateToProps = (state) => {
  return {
    Alert: state.Alert,
    Auth: state.Auth,
  };
};

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <div className='d-xl-none' style={{ height: '100%' }}>
          <HeaderMobile />
          <div className='col-12 offset-5'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-secondary'></span>
            <p>loading...</p>
          </div>
          <FooterMobile />
        </div>
        <div className='d-none d-xl-block '>
          <Header />
          <div className='col-12 offset-5'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-secondary'></span>
            <p>loading...</p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Loading);
