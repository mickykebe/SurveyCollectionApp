import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from '../constants';
import Condition from 'components/form/SurveyForm/components/Condition';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, ownProps) => ({
  
})

export default connect(mapStateToProps)(Condition);