import { connect } from 'react-redux';
import { getRegisterErrors } from '../reducers';
import MemberRegister from '../components/MemberRegister';
import { register } from '../actions';
import api from '../api';

const mapStateToProps = (state) => ({
  errors: getRegisterErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (user) => {
    dispatch(register(api.Auth.memberRegister(user)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberRegister);