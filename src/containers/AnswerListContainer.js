import { connect } from 'react-redux';
import { getSortedResponseAnswers } from '../reducers';
import AnswerList from '../components/AnswerList';

const mapStateToProps = (state, { responseId }) => ({
  answers: getSortedResponseAnswers(state, responseId),
});

export default connect(mapStateToProps)(AnswerList);