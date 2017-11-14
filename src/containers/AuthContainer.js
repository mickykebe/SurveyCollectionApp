import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthDataLoader from './AuthDataLoader';

class AuthContainer extends Component {
  render() {
    const { currentUser, children } = this.props;

    if(!currentUser) {
      return <Redirect to="/login" />;
    }
    else {
      return (
        <AuthDataLoader>
          {children}
        </AuthDataLoader>
      )
    }
  }
}

export default AuthContainer;