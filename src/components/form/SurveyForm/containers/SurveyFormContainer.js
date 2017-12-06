import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, initialize } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { 
  getAllLanguages, 
  getLanguagesFromCodes,
  getSurveyCreateErrors, 
  getIsCreatingSurvey 
} from 'reducers';
import { surveyFormName } from '../constants';
import validator from '../validator';
import SurveyForm from '../components/SurveyForm';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state) => {
  const langCodes = formSelector(state, 'languages') || [];
  const formLanguages = getLanguagesFromCodes(state, langCodes);

  return {
    allLanguages: getAllLanguages(state),
    formLanguages,
    inProgress: getIsCreatingSurvey(state),
    errors: getSurveyCreateErrors(state),
  };
};

const mapDispatchToProps = (dispatch, { initialValues }) => ({
  initializeForm() {
    dispatch(initialize(surveyFormName, initialValues));
  }
})

export default compose(
    reduxForm({
      form: surveyFormName,
      validate: validator,
      destroyOnUnmount: false,
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(SurveyForm);