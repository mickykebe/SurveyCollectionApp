import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserSurveys, getIsFetchingSurveyFeed, getSurveyFeedFetchErrors } from '../reducers';
import SurveyList from 'components/SurveyList';
import { surveyFeedFetch } from '../actions';
import AppCircularProgress from '../components/AppCircularProgress';
import api from '../api';

const mapStateToProps = (state) => ({
  surveys: getCurrentUserSurveys(state),
  isFetching: getIsFetchingSurveyFeed(state),
  errors: getSurveyFeedFetchErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyFeed() {
    dispatch(surveyFeedFetch(api.Surveys.mine(), getIsFetchingSurveyFeed));
  }
});

class SurveyListContainer extends Component {
  componentDidMount() {
    this.props.fetchSurveyFeed();
  }

  render() {
    const { surveys, isFetching } = this.props;
    if(isFetching && !surveys.length) {
      return (
        <div> 
         <AppCircularProgress />
        </div>
      );
    }
      
    return (
      <div>
        <SurveyList surveys={surveys} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyListContainer);