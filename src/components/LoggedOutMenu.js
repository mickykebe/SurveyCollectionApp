import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import {
  REDIRECT_TO
} from '../actionTypes';

const mapDispatchToProps = (dispatch) => ({
  redirectTo: (path) =>
    dispatch({ type: REDIRECT_TO, path })
});

class LoggedOutMenu extends Component {
  render() {
    const { redirectTo } = this.props;
    return (
      <div>
        <Button color="contrast" onClick={() => redirectTo('/login')}>
          Login
        </Button>
        <Button color="contrast" onClick={() => redirectTo('/register')}>
          Register
        </Button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoggedOutMenu);