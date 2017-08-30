import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from 'constantValues';
import { getLanguagesFromCodes } from 'reducers';
import QuestionForm from '../components/QuestionForm';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, { input: { name:question } }) => {
  const langCodes = formSelector(state, 'languages');
  const formLanguages = getLanguagesFromCodes(state, langCodes);

  return {
    formLanguages,
  };
};

export default connect(mapStateToProps)(QuestionForm);