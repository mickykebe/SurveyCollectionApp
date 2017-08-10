import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import BlankAnswer from './BlankAnswer';
import NumberRangeAnswer from './NumberRangeAnswer';
import ChoiceListAnswer from './ChoiceListAnswer';
import _get from 'lodash/get';
import { renderMenuSelectField } from './helper/fieldRenderers';
import mockData from '../../mockData';

const stylesheet = createStyleSheet(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px 0',
    flexWrap: 'wrap',
  },
  selectorContainer: {
    flex: 1,
    marginRight: '16px'
  },
  fieldsContainer: {
    flex: 3,
  }
}));

const mapStateToProps = (state, { questionIndex }) => {
  return {
    activeQuestionType: _get(state, `form.surveyForm.values.questions[${questionIndex}].type`),
    questionTypes: Object.keys(mockData.questionTypes).map((key) => mockData.questionTypes[key]),
  };
}

class QuestionTypeContainer extends Component {
  render() {
    const { classes, question, activeLanguages, activeQuestionType, questionTypes } = this.props;
    const questionTypeOptions = questionTypes.map((qt) => ({ val: qt.type, label: qt.name }));
    if(!activeQuestionType) {
      return null;
    }
    return (
      <div className={classes.root}>
        <div className={classes.selectorContainer}>
          <Field
            name={`${question}.type`}
            component={renderMenuSelectField}
            label='Question Type'
            options={questionTypeOptions}
            fullWidth={true}
            margin="normal"
            />
        </div>
        <div className={classes.fieldsContainer}>
          { 
            activeQuestionType === 'text' &&
            <BlankAnswer placeholder="Text Answer" />
          }
          {
            activeQuestionType === 'number' &&
            <BlankAnswer placeholder="Number Answer" />
          }
          {
            activeQuestionType === 'number-range' &&
            <NumberRangeAnswer
              question={question} />
          }
          {
            activeQuestionType.startsWith('choose') &&
            <FieldArray
              name={`${question}.choices`}
              component={ChoiceListAnswer}
              choiceType={activeQuestionType === 'choose-one' ? "single" : "multiple"}
              activeLanguages={activeLanguages}
               />
          }
        </div>
      </div>
    );
  }
}

export default compose(
    connect(mapStateToProps),
    withStyles(stylesheet)
)(QuestionTypeContainer);