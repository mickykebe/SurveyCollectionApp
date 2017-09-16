import { connect } from 'react-redux';
import { getQuestion } from '../reducers';
import Answer from '../components/Answer';

const mapStateToProps = (state, { answer }) => ({
  question: getQuestion(state, answer.question)
});

export default connect(mapStateToProps)(Answer);