import { connect } from "react-redux";
import { getSurveyResponseAnswer } from "../reducers";

const mapStateToProps = (state, { responseId, questionId }) => ({
  answer: getSurveyResponseAnswer(state, responseId, questionId)
});

function ResponseAnswerContainer({ answer, render }) {
  return render({ answer });
}

export default connect(mapStateToProps)(ResponseAnswerContainer);
