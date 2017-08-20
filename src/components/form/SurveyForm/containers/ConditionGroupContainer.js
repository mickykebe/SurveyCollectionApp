import { connect } from 'react-redux';
import { OPERATOR_CODES_LOGICAL } from 'reducers/operators';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from 'constantValues';
import { getOperators } from 'reducers';
import ConditionGroup from 'components/form/SurveyForm/components/ConditionGroup';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, ownProps) => {
  const allQuestions = formSelector(state, 'questions');
  return {
    logicalOperators: getOperators(state, OPERATOR_CODES_LOGICAL),
    currentQuestion: allQuestions[ownProps.index],
    allQuestions,
  };
};

export default connect(mapStateToProps)(ConditionGroup);