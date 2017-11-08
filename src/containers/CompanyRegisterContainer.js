import { connect } from 'react-redux';
import { getCompaniesFetchError } from '../reducers';
import CompanyRegister from '../components/CompanyRegister';

const mapStateToProps = (state) => ({
  errors: getCompaniesFetchError(state)
});

export default connect(mapStateToProps)(CompanyRegister);