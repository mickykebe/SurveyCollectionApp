import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import BlankAnswer from './BlankAnswer';
import NumberRangeAnswer from './NumberRangeAnswer';
import ChoiceListAnswer from './ChoiceListAnswer';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import { surveyFormName } from 'constantValues';
import { getAllQuestionTypes } from 'reducers';

const styles = {
  root: {
    display: 'flex',
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
};

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state, { question }) => {
  return {
    activeQuestionType: formSelector(state, `${question}.type`),
    questionTypes: getAllQuestionTypes(state),
  };
}

class QuestionTypeContainer extends Component {
  render() {
    const { classes, question, formLanguages, activeQuestionType, questionTypes } = this.props;
    const questionTypeOptions = questionTypes.map((qt) => ({ val: qt.type, label: qt.name }));
    if(!activeQuestionType) {
      return null;
    }
    return (
      <div className={classes.root}>
        <div className={classes.selectorContainer}>
          <Field
            name="type"
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
            <NumberRangeAnswer />
          }
          {
            activeQuestionType.startsWith('choose') &&
            <FieldArray
              name="choices"
              component={ChoiceListAnswer}
              choiceType={activeQuestionType === 'choose-one' ? "single" : "multiple"}
              formLanguages={formLanguages}
               />
          }
        </div>
      </div>
    );
  }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(QuestionTypeContainer);