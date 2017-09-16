import { connect } from 'react-redux';
import { getChoice } from '../reducers';
import AnswerChooseOne from '../components/AnswerChooseOne';

const mapStateToProps = (state, { value }) => ({
  choice: getChoice(state, value),
})

export default connect(mapStateToProps)(AnswerChooseOne);