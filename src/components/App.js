import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { clearPopup, getCurrentUser } from '../actions';
import { getAppLoadError, getPopupMessage } from '../reducers';
import api from '../api';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import SurveyForm from './form/SurveyForm';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import PopupSnackbar from './PopupSnackbar';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto'
    },
    input: {
      boxShadow: 'none',
    },
  },
  content: {
    maxWidth: '1024px',
    margin: '20px auto 0',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  }
});

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appLoadError: getAppLoadError(state),
  token: state.common.token,
  currentUser: state.common.currentUser,
  popupMessage: getPopupMessage(state),
});

const mapDispatchToProps = dispatch => ({
  onLoad: (token) =>
    dispatch(getCurrentUser(token)),
  clearPopupMessage: () =>
    dispatch(clearPopup()),
});

class App extends Component {
  
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if(token) {
      api.setToken(token);
    }

    this.props.onLoad(token);
  }

  render() {
    const { classes, appLoaded, appLoadError, popupMessage } = this.props;
    if(!appLoaded && appLoadError) {
      return (
        <div>
          {appLoadError}
        </div>
      );
    }
    
    if(!appLoaded) {
      return null;
    }

    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        <div className={classes.content}>
          <PrivateRoute exact path="/" component={Home} />
          <PublicOnlyRoute path="/register" component={Register} />
          <PublicOnlyRoute path="/login" component={Login} />
          <PrivateRoute path="/surveys/new" component={SurveyForm} />
        </div>
        <PopupSnackbar 
          show={!!popupMessage}
          message={popupMessage}
          onClose={this.props.clearPopupMessage} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(App);