import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { 
  APP_LOAD, 
  REDIRECT_DONE 
} from '../actionTypes';
import api from '../api';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import PopupSnackbar from './PopupSnackbar';
import Home from './Home';
import SurveyForm from './SurveyForm';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const stylesheet = createStyleSheet((theme) => ({
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
    }
  },
  content: {
    maxWidth: '1080px',
    margin: '20px auto 0',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  }
}));

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  token: state.common.token,
  redirectTo: state.common.redirectTo,
  currentUser: state.common.currentUser,
  networkError: state.common.networkError
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT_DONE })
});

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }
  
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if(token) {
      api.setToken(token);
    }

    this.props.onLoad(token ? api.Auth.current() : null, token);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        <div className={classes.content}>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/surveys/new" component={SurveyForm} />
        </div>
        <PopupSnackbar 
          show={this.props.networkError}
          message='Problem occurred connecting to server' />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(stylesheet)(App)));
