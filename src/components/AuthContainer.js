import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REDIRECT_TO } from '../actionTypes';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});
const mapDispatchToProps = (dispatch) => ({
  redirectToLogin: () =>
    dispatch({ type: REDIRECT_TO, path: '/login' })
});

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    const { appLoaded, currentUser } = nextProps;
    if(appLoaded && !currentUser) {
      this.props.redirectToLogin();
    }
  }
  render() {
    if(this.props.appLoaded) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);