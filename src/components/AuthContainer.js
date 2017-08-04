import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { REDIRECT_TO } from '../actionTypes';

const stylesheet = createStyleSheet(() => ({

}));

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  currentUser: state.common.currentUser
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(stylesheet)(Home));