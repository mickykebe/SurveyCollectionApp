import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ShortAnswer from './form/ShortAnswer';
import _get from 'lodash/get';

const stylesheet = createStyleSheet(() => ({

}));

const mapStateToProps = (state, { questionIndex }) => {
  return {questionType: _get(state, `form.surveyForm.values.questions[${questionIndex}].type`), };
}

class QuestionTypeContainer extends Component {
  render() {
    const { questionType } = this.props;
    if(!questionType) {
      return null;
    }
    return (
      <div>
        { 
          questionType === 'text' &&
          <ShortAnswer />
        }
      </div>
    );
  }
}

export default compose(
    connect(mapStateToProps),
    withStyles(stylesheet)
)(QuestionTypeContainer);