import { connect } from 'react-redux';
import { surveyFeedFetch, surveyDelete } from '../actions';
import { 
  getCurrentUserSurveys, 
  getIsFetchingSurveyFeed, 
  getSurveyFeedFetchErrors,
  getSurveyFeedNext,
 } from 'reducers';
import SurveyTable from '../components/SurveyTable';
import api from '../api';

const mapStateToProps = (state, { languages: codes}) => ({
  surveys: getCurrentUserSurveys(state),
  isFetching: getIsFetchingSurveyFeed(state),
  fetchErrors: getSurveyFeedFetchErrors(state),
  next: getSurveyFeedNext(state),
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchSurveyFeed() {
    return dispatch(surveyFeedFetch(api.Surveys.mine(stateProps.next), getIsFetchingSurveyFeed))
  },
  deleteSurvey(surveyId) {
    return dispatch(surveyDelete(api.Surveys.delete(surveyId), { id: surveyId }));
  }
})

export default connect(mapStateToProps, null, mergeProps)(SurveyTable);