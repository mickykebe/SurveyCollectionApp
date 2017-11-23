import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers';

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
})

function WithPermission({currentUser, permission, children}) {
  if(!!currentUser && Array.prototype.findIndex.call(currentUser.permissions, (p) => p === permission) !== -1) {
    return children;
  }
  return null;
}

export default connect(mapStateToProps)(WithPermission);