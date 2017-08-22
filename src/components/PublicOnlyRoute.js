import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCurrentUser } from '../reducers';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

function PublicOnlyRoute({ location, currentUser, component: Component, ...rest}) {
  return <Route {...rest} location={location} render={props => (
    !!currentUser ? 
      <Redirect to={{ pathname: '/' }} /> :
      <Component {...props} />
  )} />
}

export default withRouter(connect(mapStateToProps)(PublicOnlyRoute));