import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import BlankAnswer from './BlankAnswer';
import NumberRangeAnswer from './NumberRangeAnswer';
import ChoiceListAnswer from './ChoiceListAnswer';
import DateAnswer from './DateAnswer';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    flexWrap: 'wrap',
  },
  selectorContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flex: 1,
    marginRight: '16px'
  },
  fieldsContainer: {
    flex: 3,
  }
};

class QuestionType extends Component {
  render() {
    const { 
      classes, 
      formLanguages, 
      activeQuestionType, 
      questionTypes, 
      controllingQuestions, 
      disableFields = false,
      onFieldMouseEnter,
      onFieldMouseLeave,
    } = this.props;

    const questionTypeOptions = questionTypes.map((qt) => ({ val: qt.id, label: qt.name }));
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
            rightAlign={true}
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
              disabled={disableFields}
              onMouseEnter={onFieldMouseEnter}
              onMouseLeave={onFieldMouseLeave}/>
          }
          {
            activeQuestionType === 'date' &&
            <DateAnswer />
          }
          {
            activeQuestionType.startsWith('choose') &&
            <FieldArray
              name="choices"
              component={ChoiceListAnswer}
              choiceType={activeQuestionType === 'choose-one' ? "single" : "multiple"}
              formLanguages={formLanguages}
              controllingQuestions={controllingQuestions}
              disableFields={disableFields}
              onFieldMouseEnter={onFieldMouseEnter}
              onFieldMouseLeave={onFieldMouseLeave}
               />
          }
          {
            activeQuestionType === 'location' &&
            <BlankAnswer placeholder="Location Answer" />
          }
          {
            activeQuestionType === 'image' &&
            <BlankAnswer placeholder="Image Upload" />
          }
          {
            activeQuestionType === 'currency' &&
            <BlankAnswer placeholder="Currency" />
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(QuestionType);