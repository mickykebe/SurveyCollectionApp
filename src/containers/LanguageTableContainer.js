import { connect } from 'react-redux';
import { getAllLanguages } from '../reducers';
import LanguageTable from '../components/LanguageTable';

const mapStateToProps = (state) => ({
  languages: getAllLanguages(state),
});

export default connect(mapStateToProps)(LanguageTable);