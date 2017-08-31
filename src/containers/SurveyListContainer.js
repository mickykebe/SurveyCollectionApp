import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserSurveys, getIsFetchingSurveys, getSurveyFetchErrors } from 'reducers';
import SurveyList from 'components/SurveyList';
import { surveysFetch } from '../actions';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import api from '../api';

const styles = {
  progress: {
    display: 'block',
    margin: '0 auto',
  }
}

const mapStateToProps = (state) => ({
  surveys: getCurrentUserSurveys(state),
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
    if(isFetching && !surveys.length) {
      return (
        <div> 
          <CircularProgress className={classes.progress} color="accent" />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SurveyListContainer));