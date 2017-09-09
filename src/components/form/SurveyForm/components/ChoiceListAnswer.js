import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import ChoiceAnswer from './ChoiceAnswer';
import ChoiceCondition from './ChoiceCondition';
import { uuidv4 } from 'utils';
import FormToolbar from './FormToolbar';

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
        <FormToolbar
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
                <Field
                  name={choice}
                  component={choiceSchema === 'choice_condition' ? ChoiceCondition : ChoiceAnswer}
                  choiceType={choiceType}
                  formLanguages={formLanguages}
                  onRemove={() => fields.remove(index)}
                  controllingQuestions={controllingQuestions} />
              </FormSection>);
          })
        }
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceListAnswer);