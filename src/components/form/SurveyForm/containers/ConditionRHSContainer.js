import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionTypeOperators } from 'reducers';

import ConditionRHS from 'components/form/SurveyForm/components/ConditionRHS';

const mapStateToProps = (state) => {
  return {
    getOperators(type) {
      return getQuestionTypeOperators(state, type);
    }
  }
};

class ConditionRHSContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedQuestion: null };
    this.setSelectedQuestion = this.setSelectedQuestion.bind(this);
  }

  componentDidMount() {
    this.setSelectedQuestion(this.props.questionId);
  }

  componentWillReceiveProps({ questionId }) {
    if(questionId !== this.props.questionId) {
      this.setSelectedQuestion(questionId);
    }
  }

  setSelectedQuestion(questionId) {
    const { controllingQuestions } = this.props;

    if(questionId !== null) {
      controllingQuestions.forEach((question) => {
        if(question.uuid === questionId) {
          this.setState({
            selectedQuestion: question,
          });
        }
      });
    }
  }

  render() {
    const { controllingQuestions, questionId, getOperators, ...rest} = this.props;
    const { selectedQuestion } = this.state;
    
    if(selectedQuestion !== null) {
      return <ConditionRHS
        question={selectedQuestion}
        operators={getOperators(selectedQuestion.type)}
        {...rest} />
    }
    return null;
  }
}

export default connect(mapStateToProps)(ConditionRHSContainer);