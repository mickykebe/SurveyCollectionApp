import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import ChoiceAnswer from './ChoiceAnswer';
import ChoiceCondition from './ChoiceCondition';
import { uuidv4 } from 'utils';
import FormSectionToolbar from './FormSectionToolbar';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
});

class ChoiceListAnswer extends Component {
  render() {
    const { 
      classes, 
      fields, 
      choiceType, 
      formLanguages, 
      controllingQuestions,
      onAddForm: onAddFormProp,
      meta: { dirty, error } 
    } = this.props;

    const onAddForm = onAddFormProp || onAddFormProp === false ? onAddFormProp : () => fields.push({ uuid: uuidv4(), schema: 'choice_condition', operator: '==' });
    return (
      <div>
        <FormSectionToolbar
          title="Choices"
          onAddField={() => fields.push({uuid: uuidv4(), schema: 'choice', index: 1 })}
          onAddForm={controllingQuestions.length && onAddForm}/>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        {
          fields.map((choice, index) => {
            const choiceSchema = fields.get(index).schema;
            return (
              <FormSection 
              key={choice}
              name={choice}>
                {
                  choiceSchema === 'choice_condition' &&
                  <ChoiceCondition
                    choiceType={choiceType}
                    formLanguages={formLanguages}
                    onRemove={() => fields.remove(index)}
                    controllingQuestions={controllingQuestions} />
                }
                {
                  choiceSchema === 'choice' &&
                  <ChoiceAnswer
                    choiceType={choiceType}
                    formLanguages={formLanguages}
                    onRemove={() => fields.remove(index)}
                    />
                }
              </FormSection>);
          })
        }
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceListAnswer);