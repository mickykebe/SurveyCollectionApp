import { connect } from 'react-redux';
import { surveysPendingFetch, surveysPublishedFetch, surveyDelete } from '../actions';
import { 
  getSurveys, 
  getIsFetchingSurveys, 
  getSurveysFetchErrors,
  getSurveysNext,
 } from 'reducers';
import SurveyTable from '../components/SurveyTable';
import api from '../api';

const mapStateToProps = (state, { languages: codes, published}) => ({
  surveys: getSurveys(state),
  isFetching: getIsFetchingSurveys(state, published),
  fetchErrors: getSurveysFetchErrors(state, published),
  next: getSurveysNext(state, published),
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchSurveyFeed() {
    const { published } = ownProps;
    const action = published ? surveysPublishedFetch : surveysPendingFetch;
    return dispatch(action(api.Surveys.mine(ownProps.published, stateProps.next)));
  },
  deleteSurvey(surveyId) {
    return dispatch(surveyDelete(api.Surveys.delete(surveyId), { id: surveyId }));
  }
})

export default connect(mapStateToProps, null, mergeProps)(SurveyTable);