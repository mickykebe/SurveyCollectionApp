import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { getCurrentUser, getPopupMessage } from '../reducers';
import { clearPopup, setCurrentUser } from '../actions';
import api from '../api';
import App from '../components/App';
import ScreenError from '../components/ScreenError';
import ScreenLoading from '../components/ScreenLoading';
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
    this.loadCurrentUser()
      .then(() => this.setState({ appLoading: false, appLoadFail: false }))
      .catch((e) => {
        if(e.response && e.response.body && e.response.body.detail === 'Signature has expired.') {
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
      return (<ScreenError text="Couldn't connect to server" retry={this.loadApp} />);
    }

    if(appLoading) {
      return <ScreenLoading text="Loading App..." />;
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