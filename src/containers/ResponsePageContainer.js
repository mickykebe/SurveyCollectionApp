import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getSurvey,
  getIsFetchingSurvey,
  getSurveyFetchErrors,
  getSurveyResponses,
  getIsFetchingSurveyResponses,
  getSurveyResponsesFetchErrors,
 } from '../reducers';
import { responsesFetch, surveyFetch } from '../actions';
import api from '../api';
import ResponsePage from '../components/ResponsePage';
import PopupSnackbar from '../components/PopupSnackbar';

const mapStateToProps = (state, { match }) => {
  const id = match.params.surveyId;
  return {
    id,
    survey: getSurvey(state, id),
    isFetchingSurvey: getIsFetchingSurvey(state, id),
    surveyFetchErrors: getSurveyFetchErrors(state, id),
    responses: getSurveyResponses(state, id),
    fetchingResponses: getIsFetchingSurveyResponses(state, id),
    responsesFetchError: getSurveyResponsesFetchErrors(state, id),
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchResponses(id) {
    return dispatch(responsesFetch(api.SurveyResponses.all(id), { survey: id }));
  },
  fetchSurvey(id) {
    return dispatch(surveyFetch(api.Surveys.get(id), { id }));
  }
});

class ResponsePageContainer extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
    this.fetchResponses = this.fetchResponses.bind(this);
  }

  fetch() {
    const { id, survey, isFetchingSurvey, fetchSurvey } = this.props;
    if(survey) {
      this.fetchResponses(id);
    }
    else if(!isFetchingSurvey) {
      fetchSurvey(id)
        .then(() => this.fetchResponses());
    }
  }
  
  fetchResponses() {
    const { id, fetchingResponses, fetchResponses } = this.props;
    if(!fetchingResponses){
      fetchResponses(id);
    }
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { 
      id, 
      survey,
      responses, 
      fetchingResponses, 
      responsesFetchError,
      isFetchingSurvey,
      surveyFetchErrors
     } = this.props;
    return (
      <div>
        <ResponsePage 
          id={id}
          survey={survey}
          responses={responses} 
          fetchingSurvey={isFetchingSurvey}
          fetchingResponses={fetchingResponses} />
        <PopupSnackbar
          show={!isFetchingSurvey && !!surveyFetchErrors}
          message="Problem occurred fetching survey"
          retryAction={this.fetch} />
        <PopupSnackbar
          show={!fetchingResponses && !!responsesFetchError}
          message="Problem occurred fetching responses"
          retryAction={this.fetchResponses} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResponsePageContainer);