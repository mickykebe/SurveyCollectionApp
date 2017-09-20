import React, { Component } from 'react';
import api from '../api';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AppLoading from './AppLoading';
import AppLoadingError from './AppLoadingError';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import PopupSnackbar from './PopupSnackbar';
import AnswerContainer from './answer/AnswerContainer';
import SurveyCreate from '../containers/SurveyCreate';
import SurveyEdit from '../containers/SurveyEdit';
import ResponsePageContainer from '../containers/ResponsePageContainer';
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
    table: {
      borderCollapse: 'collapse',
    }
  },
  content: {
    maxWidth: '1280px',
    margin: '20px auto 0',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

  loadCurrentUser() {
    const token = window.localStorage.getItem('jwt');

    if(token) {
      api.setToken(token);
    }
    this.props.onLoad(token);
  }
  
  componentWillMount() {
    this.loadCurrentUser();
  }

  render() {
    const { classes, appLoaded, appLoadError, popupMessage } = this.props;
    if(!appLoaded && appLoadError) {
      return (
        <AppLoadingError retry={this.loadCurrentUser} />
      );
    }
    
    if(!appLoaded && !appLoadError) {
      return (
        <AppLoading />
      );
    }

    return (
      <div>
        <Header currentUser={this.props.currentUser} />
        <div className={classes.content}>
          <PrivateRoute exact path="/" component={Home} />
          <PublicOnlyRoute path="/register" component={Register} />
          <PublicOnlyRoute path="/login" component={Login} />
          <PrivateRoute path="/surveys/new" component={SurveyCreate} />
          <PrivateRoute path="/surveys/edit/:surveyId" component={SurveyEdit} />
          <PrivateRoute path="/surveys/answers" component={AnswerContainer} />
          <PrivateRoute path="/surveys/responses/:surveyId" component={ResponsePageContainer} />
        </div>
        <PopupSnackbar
          show={!!popupMessage}
          message={popupMessage}
          onClose={this.props.clearPopupMessage} />
      </div>
    );
  }
}

export default withStyles(styles)(App);