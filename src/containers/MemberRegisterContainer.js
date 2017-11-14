import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRegisterErrors, getAllCompanies } from '../reducers';
import MemberRegister from '../components/MemberRegister';
import { register, showPopup } from '../actions';
import api from '../api';

const mapStateToProps = (state) => ({
  companies: getAllCompanies(state),
  errors: getRegisterErrors(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: (user) => {
    dispatch(register(api.Auth.memberRegister(user)))
      .then(() => {
        dispatch(showPopup('Registered Successfully. You\'ll be able to login once your account is activated.'));
        history.push('/login');
      });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MemberRegister));