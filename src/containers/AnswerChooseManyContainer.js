import { connect } from 'react-redux';
import { getChoice } from '../reducers';
import AnswerChooseMany from '../components/AnswerChooseMany';

const mapStateToProps = (state, { values }) => {
  return {
    choices: values.map(cId => getChoice(state, cId)),
  };
}

export default connect(mapStateToProps)(AnswerChooseMany);