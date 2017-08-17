import { connect } from 'react-redux';
import { OPERATOR_TYPE_LOGICAL } from 'reducers/operators';
import { getOperators } from 'reducers';
import ConditionGroup from 'components/form/SurveyForm/components/ConditionGroup';

const mapStateToProps = state => ({
  logicalOperators: getOperators(state, OPERATOR_TYPE_LOGICAL),
});

export default connect(mapStateToProps)(ConditionGroup);