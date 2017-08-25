import { connect } from 'react-redux';
import { getLanguage } from 'reducers';
import SurveyCard from 'components/SurveyCard';

const mapStateToProps = (state, { languages: codes}) => ({
  languages: codes.map((code) => getLanguage(state, code)),
});

export default connect(mapStateToProps)(SurveyCard);

