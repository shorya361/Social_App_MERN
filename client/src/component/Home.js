import React, { Component } from 'react';
import Header from './Header';
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <h1> Home Page</h1>
      </div>
    );
  }
}

export default Home;
