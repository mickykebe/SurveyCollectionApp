import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../reducers';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
})

function PrivateRoute({ currentUser, component: Component, render, ...rest }) {
  const renderComponent = (props) => {
    if(Component)
      return <Component {...props} />
    if(render){
      return render(props);
    }
  }

  return <Route {...rest} render={props => (
    !!currentUser ? 
      renderComponent(props) :
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));