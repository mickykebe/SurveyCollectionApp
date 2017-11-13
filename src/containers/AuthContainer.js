import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppDataLoader from './AppDataLoader';

class AuthContainer extends Component {
  render() {
    const { currentUser, children } = this.props;

    if(!currentUser) {
      return <Redirect to="/login" />;
    }
    else {
      return (
        <AppDataLoader>
          {children}
        </AppDataLoader>
      )
    }
  }
}

export default AuthContainer;