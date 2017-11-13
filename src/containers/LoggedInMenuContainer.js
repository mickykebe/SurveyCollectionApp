import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers';
import LoggedInMenu from '../components/LoggedInMenu';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(LoggedInMenu);
