
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { getAppLoadError, getPopupMessage } from '../reducers';
import { clearPopup, getCurrentUser } from '../actions';
import App from '../components/App';

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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);