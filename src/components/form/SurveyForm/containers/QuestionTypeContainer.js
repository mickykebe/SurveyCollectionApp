import { connect } from 'react-redux';
import { getAllQuestionTypes } from 'reducers';
import QuestionType from '../components/QuestionType';

const mapStateToProps = (state) => {
  return {
    questionTypes: getAllQuestionTypes(state),
  };
}

export default connect(mapStateToProps)(QuestionType);