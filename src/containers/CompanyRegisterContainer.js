import { connect } from 'react-redux';
import { adminRegister } from '../actions';
import { getRegisterAdminErrors } from '../reducers';
import CompanyRegister from '../components/CompanyRegister';
import api from '../api';

const mapStateToProps = (state) => ({
  errors: getRegisterAdminErrors(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(company) {
    dispatch(adminRegister(api.Auth.adminRegister(company)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyRegister);