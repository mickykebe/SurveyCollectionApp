import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from 'constantValues';
import { getAllQuestionTypes } from 'reducers';
import QuestionType from '../components/QuestionType';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, { input: { name } }) => {
  return {
    activeQuestionType: formSelector(state, name),
    questionTypes: getAllQuestionTypes(state),
  };
}

export default connect(mapStateToProps)(QuestionType);