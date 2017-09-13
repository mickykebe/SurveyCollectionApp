import { connect } from 'react-redux';
import { surveyDelete } from '../actions';
import { getLanguage, getIsDeletingSurvey, getSurveyDeleteErrors } from 'reducers';
import HomeSurveyRow from '../components/HomeSurveyRow';
import api from '../api';

const mapStateToProps = (state, { languages: codes}) => ({
  languages: codes.map((code) => getLanguage(state, code)),
});

export default connect(mapStateToProps)(HomeSurveyRow);