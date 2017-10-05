import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getQuestionTypeOperators } from 'reducers';
import { formValues } from 'redux-form';

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
  }

  componentWillMount() {
    const { question: questionId, controllingQuestions } = this.props;
    console.log(questionId);

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
    const { controllingQuestions, question: questionId, getOperators, ...rest} = this.props;
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

export default compose(
  formValues('question'),
  connect(mapStateToProps),
)(ConditionRHSContainer);