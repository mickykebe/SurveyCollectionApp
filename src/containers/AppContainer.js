import React, { Component } from 'react';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { 
  getCurrentUser,
  getPopupMessage, } from '../reducers';
import { companiesFetchSuccess, clearPopup, setCurrentUser } from '../actions';
import api from '../api';
import App from '../components/App';
import ConnectionError from '../components/ConnectionError';
import Loading from '../components/Loading';
import PopupSnackbar from '../components/PopupSnackbar';

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  popupMessage: getPopupMessage(state),
});

const mapDispatchToProps = dispatch => ({
  clearPopupMessage: () =>
    dispatch(clearPopup()),
  setCurrentUser(user) {
    dispatch(setCurrentUser(user));
  },
  companiesFetched(response) {
    dispatch(companiesFetchSuccess(response))
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
    const response = await api.Auth.current();
    this.props.setCurrentUser(response.user);
    return response.user;
  }

  loadApp() {
    this.setState({
      appLoading: true,
    });
    Promise.all([this.loadCurrentUser(), api.Companies.all()])
      .then(([user, companyResponse]) => {
        this.props.companiesFetched(companyResponse);
        this.setState({ appLoading: false, appLoadFail: false });
      })
      .catch((e) => {
        const error = _get(e, 'response.body.detail', false);
        if(error && error === 'Signature has expired.' || error === 'Invalid signature.') {
            window.localStorage.setItem('jwt', '');
            this.setState({ appLoading: false, appLoadFail: false });
        }
        else {
          this.setState({ appLoading: false, appLoadFail: true });
        }
      });
  }

  componentWillMount() {
    this.loadApp();
  }
  
  render() {
    const { currentUser, popupMessage, clearPopupMessage } = this.props;
    const { appLoading, appLoadFail } = this.state;

    if(!appLoading && appLoadFail) {
      return (<ConnectionError text="Couldn't connect to server" retry={this.loadApp} />);
    }

    if(appLoading) {
      return <Loading text="Loading App..." />;
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