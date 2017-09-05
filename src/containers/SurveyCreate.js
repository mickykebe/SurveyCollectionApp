import React from 'react';
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

function SurveyCreate({ inProgress, createSurvey, displayPopup, history}) {
  const create = (data) => {
    createSurvey(data)
      .then(() => {
        displayPopup('Survey created successfully');
        history.push('/');
      })
      .catch(e => displayPopup('Error occurred creating survey'));
  }
  return (
    <SurveyForm
      onSubmit={create}
      submittingForm={inProgress} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCreate);