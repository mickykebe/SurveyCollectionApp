import { connect } from 'react-redux';
import { OPERATOR_CODES_LOGICAL } from 'reducers/operators';
import { getOperators } from 'reducers';
import ConditionGroup from 'components/form/SurveyForm/components/ConditionGroup';

const mapStateToProps = (state, ownProps) => {
  return {
    logicalOperators: getOperators(state, OPERATOR_CODES_LOGICAL),
  };
};

export default connect(mapStateToProps)(ConditionGroup);