import { connect } from 'react-redux';
import { surveyDelete } from '../actions';
import { getLanguage, getIsDeletingSurvey, getSurveyDeleteErrors } from 'reducers';
import SurveyCard from 'components/SurveyCard';
import api from '../api';

const mapStateToProps = (state, { languages: codes}) => ({
  languages: codes.map((code) => getLanguage(state, code)),
  isDeletingSurvey: getIsDeletingSurvey(state),
  errors: getSurveyDeleteErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteSurvey(surveyId) {
    return dispatch(surveyDelete(api.Surveys.delete(surveyId), getIsDeletingSurvey, { id: surveyId }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);

