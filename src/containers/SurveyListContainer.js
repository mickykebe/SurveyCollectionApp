import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserSurveys, getIsFetchingSurveyFeed, getSurveyFeedFetchErrors } from '../reducers';
import SurveyList from 'components/SurveyList';
import { surveyFeedFetch, showPopup } from '../actions';
import AppCircularProgress from '../components/AppCircularProgress';
import PopupSnackbar from '../components/PopupSnackbar';
import api from '../api';

const mapStateToProps = (state) => ({
  surveys: getCurrentUserSurveys(state),
  isFetching: getIsFetchingSurveyFeed(state),
  errors: getSurveyFeedFetchErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveyFeed() {
    return dispatch(surveyFeedFetch(api.Surveys.mine(), getIsFetchingSurveyFeed));
  },
  displayPopup(message) {
    dispatch(showPopup(message));
  }
});

class SurveyListContainer extends Component {
  componentDidMount() {
    this.props.fetchSurveyFeed();
  }

  render() {
    const { surveys, isFetching, errors } = this.props;
    if(isFetching && !surveys.length) {
      return (
        <AppCircularProgress />
      );
    }
      
    return (
      <div>
        <SurveyList surveys={surveys} />
        <PopupSnackbar
          show={!isFetching && !!errors}
          message="Problem occurred fetching surveys"
          retryAction={this.fetchFeed}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyListContainer);