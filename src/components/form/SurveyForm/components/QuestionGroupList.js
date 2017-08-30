import React from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import QuestionGroup from './QuestionGroup';
import QuestionForm from './QuestionForm';
import FormToolbar from './FormToolbar';
import { uuidv4 } from 'utils';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
});

const controllingQuestions = (fields, curIndex) => {
  return fields.getAll().filter((field, index) => 
    field.schema === 'question' && index < curIndex);
}

function QuestionGroupList(props) {
  const { classes, fields, root, meta: { dirty, error }, ...rest } = props;

  return (
    <div>
      <FormToolbar 
        title="Questions"
        onAddField={() => fields.push({ 
          uuid: uuidv4(), 
          schema: 'question', 
          type: 'text',
          condition: { operator: '&&', conditions: [] }
        })}
        onAddForm={() => fields.push({ 
          uuid: uuidv4(), 
          schema: 'group',
          condition: { operator: '&&', conditions: [] },
          groupElements: [{ 
            uuid: uuidv4(), 
            schema: 'question', 
            type: 'text',
            condition: { operator: '&&', conditions: [] }
          }] 
        })}
        />
      <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
      <div>
        {
          fields.map((groupElement, index) => {
            const schema = fields.get(index).schema;
            if(schema === 'group') {
              return (
                <FormSection key={groupElement} name={groupElement}>
                  <Field
                    name={groupElement}
                    component={QuestionGroup}
                    onRemove={() => fields.remove(index)}
                    rootChild={!!root}
                    root={false}
                    index={index}
                    group={fields.get(index)}
                    controllingQuestions={controllingQuestions(fields, index)}
                    {...rest} />
                </FormSection>);
            }
            else {
              return (
                <FormSection key={groupElement} name={groupElement}>
                  <Field
                  name={groupElement}
                  component={QuestionForm}
                  onRemove={() => fields.remove(index)}
                  rootChild={!!root}
                  root={false}
                  index={index}
                  question={fields.get(index)}
                  controllingQuestions={controllingQuestions(fields, index)}
                  {...rest} />
                </FormSection>);
            }
          })
        }
      </div>
    </div>
  )
}

export default withStyles(styles)(QuestionGroupList);