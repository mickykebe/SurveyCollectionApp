import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getSurveyResponses,
  getIsFetchingSurveyResponses,
  getSurveyResponsesFetchErrors,
  getSurveyResponsesCount,
  getSurveyResponsesNext,
  getResponseTableQuestions
} from "../reducers";
import { responsesFetch, showPopup } from "../actions";
import api from "../api";
import Content from "../components/Content";
import download from "../download";
import PopupSnackbar from "../components/PopupSnackbar";
import ResponsePage from "../components/ResponsePage";
import ResponsesTable from "../components/ResponsesTable";
import SurveyContainer from "./SurveyContainer";

const mapStateToProps = (state, { surveyId }) => ({
  columnQuestions: getResponseTableQuestions(state, surveyId),
  responses: getSurveyResponses(state, surveyId),
  fetchingResponses: getIsFetchingSurveyResponses(state, surveyId),
  responsesFetchError: getSurveyResponsesFetchErrors(state, surveyId),
  responsesCount: getSurveyResponsesCount(state, surveyId),
  responsesNext: getSurveyResponsesNext(state, surveyId)
});

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchResponses() {
    return dispatch(
      responsesFetch(
        api.SurveyResponses.all(ownProps.surveyId, stateProps.responsesNext),
        { survey: ownProps.surveyId }
      )
    );
  },
  displayPopup(message) {
    return dispatch(showPopup(message));
  }
});

class ResponsesContainer extends Component {
  fetchResponses = () => {
    const { fetchingResponses, fetchResponses } = this.props;
    if (!fetchingResponses) {
      fetchResponses();
    }
  };

  downloadResponses = format => {
    const { surveyId, displayPopup } = this.props;
    api.SurveyResponses.allFormat(surveyId, format)
      .then(blob =>
        download(
          blob,
          `responses-${surveyId}.${format}`,
          format === "csv"
            ? "text/csv"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      )
      .catch(() => displayPopup("Problem occurred connecting to server."));
  };

  render() {
    const {
      swipeView,
      curResponseIndex,
      surveyId,
      columnQuestions,
      responses,
      fetchingResponses,
      responsesFetchError,
      responsesCount,
      responsesNext
    } = this.props;
    return (
      <Content>
        <SurveyContainer
          id={surveyId}
          onLoadSuccess={this.fetchResponses}
          render={surveyProps => {
            const ResponseComponent = swipeView ? ResponsePage : ResponsesTable;
            return (
              <div>
                <ResponseComponent
                  survey={surveyProps.survey}
                  columnQuestions={columnQuestions}
                  responses={responses}
                  fetchingSurvey={surveyProps.isFetching}
                  fetchingResponses={fetchingResponses}
                  responsesCount={responsesCount}
                  hasMore={!!responsesNext}
                  onFetchMore={this.fetchResponses}
                  downloadResponses={this.downloadResponses}
                  curResponseIndex={curResponseIndex}
                />
                <PopupSnackbar
                  show={!surveyProps.isFetching && !!surveyProps.errors}
                  message="Problem occurred fetcing survey"
                  retryAction={surveyProps.fetchSurvey}
                />
                <PopupSnackbar
                  show={!fetchingResponses && !!responsesFetchError}
                  message="Problem occurred fetching responses"
                  retryAction={this.fetchResponses}
                />
              </div>
            );
          }}
        />
      </Content>
    );
  }
}

export default compose(withRouter, connect(mapStateToProps, null, mergeProps))(
  ResponsesContainer
);
