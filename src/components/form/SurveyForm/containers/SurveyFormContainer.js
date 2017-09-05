import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from '../constants';
import { 
  getAllLanguages, 
  getLanguagesFromCodes,
  getSurveyCreateErrors, 
  getIsCreatingSurvey 
} from 'reducers';
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

export default connect(mapStateToProps)(SurveyForm);