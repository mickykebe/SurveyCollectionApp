import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getSurvey,
  getSurveyResponses,
  getIsFetchingSurveyResponses,
  getSurveyResponsesFetchErrors,
 } from '../reducers';
import { responsesFetch } from '../actions';
import ResponseList from '../components/ResponseList';

const mapStateToProps = (state, { match }) => {
  const id = match.params.surveyId;
  return {
    id,
    survey: getSurvey(state, id),
    responses: getSurveyResponses(state, id),
    fetchingResponses: getIsFetchingSurveyResponses(state, id),
    responsesFetchError: getSurveyResponsesFetchErrors(state, id),
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchResponses(id) {
    return dispatch(responsesFetch(id));
  }
});

class ResponseListContainer extends Component {
  constructor(props) {
    super(props);

    this.fetchResponses = this.fetchResponses.bind(this);
  }
  
  fetchResponses() {
    this.props.fetchResponses(this.props.id);
  }

  componentDidMount() {
    //this.fetchResponses();
  }

  render() {
    return <ResponseList {...this.props} onRetry={this.fetchResponses} />
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResponseListContainer);