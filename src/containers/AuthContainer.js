import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CommonDataLoader from './CommonDataLoader';

class AuthContainer extends Component {
  render() {
    const { currentUser, children } = this.props;

    if(!currentUser) {
      return <Redirect to="/login" />;
    }
    else {
      return (
        <CommonDataLoader>
          {children}
        </CommonDataLoader>
      )
    }
  }
}

export default AuthContainer;