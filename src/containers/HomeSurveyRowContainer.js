import { connect } from 'react-redux';
import { getLanguage } from 'reducers';
import HomeSurveyRow from '../components/HomeSurveyRow';

const mapStateToProps = (state, { languages: codes}) => ({
  languages: codes.map((code) => getLanguage(state, code)),
});

export default connect(mapStateToProps)(HomeSurveyRow);