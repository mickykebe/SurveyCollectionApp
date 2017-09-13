import { connect } from 'react-redux';
import { surveyFeedFetch, surveyDelete } from '../actions';
import { getCurrentUserSurveys, getIsFetchingSurveyFeed, getSurveyFeedFetchErrors, getIsDeletingSurvey, getSurveyDeleteErrors } from 'reducers';
import SurveyTable from '../components/SurveyTable';
import api from '../api';

const mapStateToProps = (state, { languages: codes}) => ({
  surveys: getCurrentUserSurveys(state),
  isFetching: getIsFetchingSurveyFeed(state),
  fetchErrors: getSurveyFeedFetchErrors(state),
  isDeletingSurvey: getIsDeletingSurvey(state),
  deleteErrors: getSurveyDeleteErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyFeed() {
    return dispatch(surveyFeedFetch(api.Surveys.mine(), getIsFetchingSurveyFeed));
  },
  deleteSurvey(surveyId) {
    return dispatch(surveyDelete(api.Surveys.delete(surveyId), getIsDeletingSurvey, { id: surveyId }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyTable);