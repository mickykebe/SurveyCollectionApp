import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSurvey, getIsFetchingSurvey, getSurveyFetchErrors }  from '../reducers';
import { surveyFetch } from '../actions';
import api from '../api';
import SurveyHeader from '../components/SurveyHeader';

const mapStateToProps = (state, { id }) => ({
  survey: getSurvey(state, id),
  isFetching: getIsFetchingSurvey(state, id),
  fetchErrors: getSurveyFetchErrors(state, id),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurvey(id) {
    return dispatch(surveyFetch(api.Surveys.get(id), { id }));
  }
})

class SurveyHeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.fetchSurvey = this.fetchSurvey.bind(this);
  }

  fetchSurvey() {
    const { id, survey, isFetching, fetchSurvey } = this.props;
    if(!survey && !isFetching) {
      fetchSurvey(id);
    }
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  render() {
    const { isFetching, fetchErrors, ...rest } = this.props;
    return (
      <div>
        <SurveyHeader inProgress={isFetching} error={fetchErrors} onRetry={this.fetchSurvey} {...rest} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyHeaderContainer);