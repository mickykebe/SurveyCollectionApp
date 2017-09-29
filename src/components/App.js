import React, { Component } from 'react';
import AppFrame from './AppFrame';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import SurveyCreate from '../containers/SurveyCreate';
import SurveyEdit from '../containers/SurveyEdit';
import ResponsePageContainer from '../containers/ResponsePageContainer';
import LanguageTableContainer from '../containers/LanguageTableContainer';
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
});

class App extends Component {
  render() {
    const { 
      currentUser,
     } = this.props;

    return (
      <div>
        <PublicOnlyRoute 
          path="/register" 
          render={(props) => <AppFrame currentUser={currentUser} disableDrawer={true}><Register /></AppFrame> }
          />
        <PublicOnlyRoute 
          path="/login" 
          render={(props) => <AppFrame currentUser={currentUser} disableDrawer={true}><Login /></AppFrame> } 
          />
        <PrivateRoute
          exact
          path="/"
          render={(props) => <AppFrame currentUser={currentUser} appBarTitle="My Surveys"><Home /></AppFrame>}
          />
        <PrivateRoute 
          path="/surveys/new" 
          render={(props) => <AppFrame currentUser={currentUser} appBarTitle="Create survey"><SurveyCreate history={props.history} /></AppFrame> } />
        <PrivateRoute 
          path="/surveys/edit/:surveyId" 
          render={(props) => <AppFrame currentUser={currentUser} appBarTitle="Edit survey"><SurveyEdit id={props.match.params.surveyId} history={props.history} /></AppFrame> } />
        <PrivateRoute 
          path="/surveys/responses/:surveyId" 
          render={(props) => <AppFrame currentUser={currentUser} appBarTitle="Survey responses"><ResponsePageContainer id={props.match.params.surveyId}/></AppFrame> } />
        <PrivateRoute
          path="/languages"
          render={(props) => <AppFrame currentUser={currentUser} appBarTitle="Language Admin"><LanguageTableContainer /></AppFrame>}
          />
      </div>
    );
  }
}

export default withStyles(styles)(App);