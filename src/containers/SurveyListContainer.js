import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSurveys, getIsFetchingSurveys, getSurveyFetchErrors } from 'reducers';
import SurveyList from 'components/SurveyList';
import { surveysFetch } from '../actions';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import api from '../api';

const styles = {
  progress: {
    margin: '0 auto',
  }
}

const mapStateToProps = (state) => ({
  surveys: getAllSurveys(state),
  isFetching: getIsFetchingSurveys(state),
  errors: getSurveyFetchErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveys() {
    dispatch(surveysFetch(api.Surveys.mine(), getIsFetchingSurveys));
  }
});

class SurveyListContainer extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    const { classes, surveys, isFetching } = this.props;
    if(isFetching && !surveys.length)
      return <CircularProgress className={classes.progress} color="accent" />
    return (
      <div>
        <SurveyList surveys={surveys} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyListContainer);