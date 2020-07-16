// import React from 'react';
// import PropTypes from 'prop-types';

// const Alert = (alerts) =>
//   alerts !== null &&
//   alerts.length > 0 &&
//   alerts.map((alert) => (
//     <div key={alert.id} className={'alert alert-${alert.alertType}'}>
//       {alert.msg}
//     </div>
//   ));

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };
// export default connect(mapStateToProps)(Alert);

import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  Alert: state.Alert,
});

class Alert extends Component {
  constructor(props) {
    super(props);
    console.log('Alert: ' + this);
  }
  render() {
    return <h1 style={{ textAlign: 'center' }}>Alert Component</h1>;
  }
}

export default connect(mapStateToProps)(Alert);
