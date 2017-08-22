import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../reducers';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
})

function PrivateRoute({ currentUser, component: Component, ...rest }) {
  return <Route {...rest} render={props => (
    !!currentUser ? 
      <Component {...props} /> :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));