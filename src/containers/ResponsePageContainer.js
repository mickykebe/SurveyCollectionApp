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
  getSurveyResponsesCount,
  getSurveyResponsesNext,
 } from '../reducers';
import { 
  responsesFetch, 
  surveyFetch,
  showPopup } from '../actions';
import api from '../api';
import Content from '../components/Content';
import ResponsePage from '../components/ResponsePage';
import PopupSnackbar from '../components/PopupSnackbar';
import download from '../download';

const mapStateToProps = (state, { id }) => ({
  id,
  survey: getSurvey(state, id),
  isFetchingSurvey: getIsFetchingSurvey(state, id),
  surveyFetchErrors: getSurveyFetchErrors(state, id),
  responses: getSurveyResponses(state, id),
  fetchingResponses: getIsFetchingSurveyResponses(state, id),
  responsesFetchError: getSurveyResponsesFetchErrors(state, id),
  responsesCount: getSurveyResponsesCount(state, id),
  responsesNext: getSurveyResponsesNext(state, id),
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchResponses() {
    return dispatch(responsesFetch(
      api.SurveyResponses.all(stateProps.id, stateProps.responsesNext),
      { survey: stateProps.id }));
  },
  fetchSurvey() {
    return dispatch(surveyFetch(api.Surveys.get(stateProps.id), { id: stateProps.id }));
  },
  displayPopup(message) {
    return dispatch(showPopup(message));
  }
})

class ResponsePageContainer extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
    this.fetchResponses = this.fetchResponses.bind(this);
  }

  fetch() {
    const { survey, isFetchingSurvey, fetchSurvey } = this.props;
    if(survey) {
      this.fetchResponses();
    }
    else if(!isFetchingSurvey) {
      fetchSurvey()
        .then(() => this.fetchResponses());
    }
  }
  
  fetchResponses() {
    const { fetchingResponses, fetchResponses } = this.props;
    if(!fetchingResponses){
      fetchResponses();
    }
  }

  downloadResponses = (format) => {
    const { id, displayPopup } = this.props;
    api.SurveyResponses.allFormat(id, format)
      .then(blob => download(
        blob,
        `responses-${id}.${format}`, 
        format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
      .catch(() => displayPopup('Problem occurred connecting to server.'));
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
      surveyFetchErrors,
      responsesCount,
      responsesNext
     } = this.props;
    return (
      <Content>
        <ResponsePage 
          id={id}
          survey={survey}
          responses={responses} 
          fetchingSurvey={isFetchingSurvey}
          fetchingResponses={fetchingResponses}
          responsesCount={responsesCount}
          hasMore={!!responsesNext}
          onFetchMore={this.fetchResponses}
          downloadResponses={this.downloadResponses} />
        <PopupSnackbar
          show={!isFetchingSurvey && !!surveyFetchErrors}
          message="Problem occurred fetching survey"
          retryAction={this.fetch} />
        <PopupSnackbar
          show={!fetchingResponses && !!responsesFetchError}
          message="Problem occurred fetching responses"
          retryAction={this.fetchResponses} />
      </Content>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, null, mergeProps)
)(ResponsePageContainer);