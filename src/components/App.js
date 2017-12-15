import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppFrame from "./AppFrame";
import Login from "./Login";
import RegisterContainer from "../containers/RegisterContainer";
import Home from "./Home";
import PublicOnlyRoute from "./PublicOnlyRoute";
import SurveyCreate from "../containers/SurveyCreate";
import SurveyEdit from "../containers/SurveyEdit";
import ResponsesContainer from "../containers/ResponsesContainer";
import LanguageTableContainer from "../containers/LanguageTableContainer";
import AuthContainer from "../containers/AuthContainer";
import ProfilesManage from "./ProfilesManage";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  "@global": {
    html: {
      boxSizing: "border-box"
    },
    "*, *:before, *:after": {
      boxSizing: "inherit"
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.primary,
      lineHeight: "1.2",
      overflowX: "hidden",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    a: {
      textDecoration: "none",
      color: "inherit"
    },
    img: {
      maxWidth: "100%",
      height: "auto",
      width: "auto"
    },
    input: {
      boxShadow: "none"
    },
    table: {
      borderCollapse: "collapse"
    }
  }
});

class App extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <AppFrame loggedIn={!!currentUser}>
        <PublicOnlyRoute path="/register" component={RegisterContainer} />
        <PublicOnlyRoute path="/login" component={Login} />
        <AuthContainer currentUser={currentUser}>
          <Route exact path="/" component={Home} />
          <Route
            path="/surveys/edit/:surveyId"
            render={({ match, history }) => (
              <SurveyEdit id={match.params.surveyId} history={history} />
            )}
          />
          <Route path="/surveys/new" component={SurveyCreate} />
          <Route
            path="/surveys/responses/:surveyId"
            render={({ match, location }) => {
              const query = new URLSearchParams(location.search);
              const swipeView =
                query.has("swipeView") && query.get("swipeView") !== "false";
              const curResponseIndex =
                (location.state && location.state.curResponseIndex) || 0;

              return (
                <ResponsesContainer
                  surveyId={match.params.surveyId}
                  swipeView={swipeView}
                  curResponseIndex={curResponseIndex}
                />
              );
            }}
          />
          <Route path="/languages" component={LanguageTableContainer} />
          <Route path="/users" component={ProfilesManage} />
        </AuthContainer>
      </AppFrame>
    );
  }
}

export default withStyles(styles)(App);
