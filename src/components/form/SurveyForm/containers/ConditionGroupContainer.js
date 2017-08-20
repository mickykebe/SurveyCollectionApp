import { connect } from 'react-redux';
import { OPERATOR_CODES_LOGICAL } from 'reducers/operators';
import { formValueSelector } from 'redux-form';
import { surveyFormName } from 'constantValues';
import { getOperators } from 'reducers';
import ConditionGroup from 'components/form/SurveyForm/components/ConditionGroup';

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, ownProps) => ({
  logicalOperators: getOperators(state, OPERATOR_CODES_LOGICAL),
  currentQuestion: formSelector(state, ownProps.question),
  allQuestions: formSelector(state, 'questions').map((q, index) => ({...q, index: index+1 })),
});

export default connect(mapStateToProps)(ConditionGroup);