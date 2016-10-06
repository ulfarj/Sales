import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/account';
import { Button } from 'react-bootstrap';

class Logout extends Component {

  logoutUser = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    return(
        <Button
          bsStyle="primary"
          onClick={e => this.logoutUser()}
        >
          Útskrá
        </Button>
    );
  }
}

export default connect()(Logout)
