import React, { Component } from 'react';
import { connect } from 'react-redux';
import { surveyCreate, showPopup } from '../actions';
import api from '../api';
import {
  getIsCreatingSurvey
} from '../reducers';
import SurveyForm from '../components/form/SurveyForm';

const mapStateToProps = (state) => ({
  inProgress: getIsCreatingSurvey(state),
});

const mapDispatchToProps = (dispatch) => ({
  createSurvey(survey) {
    return dispatch(surveyCreate(api.Surveys.create(survey), getIsCreatingSurvey));
  },
  displayPopup(message) {
    dispatch(showPopup(message));
  }
});

class SurveyCreate extends Component{
  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
  }

  create(data) {
    const { createSurvey, displayPopup, history } = this.props;

    createSurvey(data)
      .then(() => {
        displayPopup('Survey created successfully');
        history.push('/');
      })
      .catch(e => displayPopup('Error occurred creating survey'));
  }

  render() {

    return (
      <SurveyForm
        onSubmit={this.create}
        submittingForm={this.props.inProgress} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCreate);