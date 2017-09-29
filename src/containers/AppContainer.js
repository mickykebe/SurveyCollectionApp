import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { getIsFetchingLanguages, getLanguagesFetchErrors, getCurrentUser, getPopupMessage } from '../reducers';
import { clearPopup, setCurrentUser, languagesFetch } from '../actions';
import api from '../api';
import App from '../components/App';
import AppLoadingError from '../components/AppLoadingError';
import AppLoading from '../components/AppLoading';
import PopupSnackbar from '../components/PopupSnackbar';

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  popupMessage: getPopupMessage(state),
  fetchingLanguages: getIsFetchingLanguages(state),
  langFetchErrors: getLanguagesFetchErrors(state),
});

const mapDispatchToProps = dispatch => ({
  clearPopupMessage: () =>
    dispatch(clearPopup()),
  fetchLanguages: () =>
    dispatch(languagesFetch(api.Languages.all())),
  setCurrentUser(user) {
    dispatch(setCurrentUser(user));
  }
});

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { appLoading: false, appLoadFail: false };
    this.loadApp = this.loadApp.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

  async loadCurrentUser() {
    const token = window.localStorage.getItem('jwt');
    if(!token) {
      return;
    }
    api.setToken(token);
    try {
      const response = await api.Auth.current();
      this.props.setCurrentUser(response.user);
      return response.user;
    }
    catch(e) {
      if(e.response && e.response.body && e.response.body.detail === 'Signature has expired.') {
        return;
      }
      return Promise.reject(e);
    }
  }

  loadApp() {
    this.setState({
      appLoading: true,
    });
    this.loadCurrentUser()
      .then((user) => {
        if(!user) {
          this.setState({
            appLoading: false,
            appLoadFail: false,
          });
          return;
        }
        return this.props.fetchLanguages()
          .then(() => {
            this.setState({
              appLoading: false,
              appLoadFail: false,
            })
          });
      })
      .catch(e => {
        this.setState({
          appLoading: false,
          appLoadFail: true,
        })
      });
  }

  componentWillMount() {
    this.loadApp();
  }

  render() {
    const { currentUser, popupMessage, clearPopupMessage } = this.props;
    const { appLoading, appLoadFail } = this.state;

    if(!appLoading && appLoadFail) {
      return (<AppLoadingError retry={this.loadApp} />);
    }

    if(appLoading) {
      return <AppLoading />;
    }

    return (
      <div>
        <App currentUser={currentUser} />
        <PopupSnackbar
          show={!!popupMessage}
          message={popupMessage}
          onClose={clearPopupMessage} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);