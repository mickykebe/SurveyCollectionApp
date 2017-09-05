import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from '../constants';
import QuestionGroup from '../components/QuestionGroup';
import { getLanguagesFromCodes } from 'reducers';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state) => {
  const codes = formSelector(state, 'languages');
  return {
    formLanguages: getLanguagesFromCodes(state, codes),
  }
}

export default connect(mapStateToProps)(QuestionGroup);