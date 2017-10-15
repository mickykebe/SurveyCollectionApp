import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import ConditionContainer from '../containers/ConditionContainer';
import ChoiceListAnswer from './ChoiceListAnswer';
import { withStyles } from 'material-ui/styles';

const styles = {
  choices: {
    marginLeft: '20px',
  },
};

class ChoiceCondition extends Component{
  render() {
    const { 
      classes, 
      controllingQuestions, 
      formLanguages, 
      choiceType, 
      onRemove,
      conditionValue,
      disableFields = false,
      onFieldMouseEnter,
      onFieldMouseLeave
     } = this.props;

    return (
      <div>
        <ConditionContainer
          controllingQuestions={controllingQuestions}
          onRemove={onRemove} />
        { 
          conditionValue !== undefined &&
          <div className={classes.choices}>
            <FieldArray
              name='choices'
              component={ChoiceListAnswer}
              controllingQuestions={controllingQuestions}
              formLanguages={formLanguages}
              choiceType={choiceType}
              onAddForm={false}
              disableFields={disableFields}
              onFieldMouseEnter={onFieldMouseEnter}
              onFieldMouseLeave={onFieldMouseLeave} />
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ChoiceCondition);