import { connect } from 'react-redux';
import { getIsAuthenticating } from '../reducers';
import AuthView from '../components/AuthView';

const mapStateToProps = (state) => ({
  isAuthenticating: getIsAuthenticating(state),
});

export default connect(mapStateToProps)(AuthView);