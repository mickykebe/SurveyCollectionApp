import { connect } from 'react-redux';
import { getQuestionTypeOperators } from 'reducers';
import ConditionRHS from 'components/form/SurveyForm/components/ConditionRHS';

const mapStateToProps = (state, { question }) => ({
  operators: getQuestionTypeOperators(state, question.type),
});

export default connect(mapStateToProps)(ConditionRHS);