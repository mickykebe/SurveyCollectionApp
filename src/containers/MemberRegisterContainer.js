import { connect } from 'react-redux';
import { getRegisterErrors } from '../reducers';
import MemberRegister from '../components/MemberRegister';
import { register } from '../actions';
import api from '../api';

const mapStateToProps = (state) => ({
  errors: getRegisterErrors,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, first_name, last_name, email, password, confirm_password, company) => {
    dispatch(register(
      api.Auth.memberRegister(username, first_name, last_name, email, password, confirm_password, company),
    ));
  },
});

export default connect(mapStateToProps)(MemberRegister);