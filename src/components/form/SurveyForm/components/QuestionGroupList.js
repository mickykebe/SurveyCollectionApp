import React from 'react';
import { compose } from 'redux';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionGroup from './QuestionGroup';
import QuestionForm from './QuestionForm';
import FormSectionToolbar from './FormSectionToolbar';
import FormSectionActions from './FormSectionActions';
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

  const addQuestion = () => {
    fields.push({ 
      uuid: uuidv4(),
      schema: 'question', 
      index: fields.length+1,
      type: 'text',
      condition: { operator: '&&', conditions: [] }
    });
  }

  const addQuestionGroup = () => {
    fields.push({ 
      uuid: uuidv4(), 
      schema: 'group',
      index: fields.length+1,
      condition: { operator: '&&', conditions: [] },
      groupElements: [{ 
        uuid: uuidv4(), 
        schema: 'question', 
        index: 1,
        type: 'text',
        condition: { operator: '&&', conditions: [] }
      }] 
    })
  }


  return (
    <div>
      <FormSectionToolbar title="Questions" />
      <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
      <div>
        {
          fields.map((groupElement, index) => {
            const schema = fields.get(index).schema;
            if(schema === 'group') {
              return (
                <FormSection key={groupElement} name={groupElement}>
                  <QuestionGroup
                    onRemove={() => fields.remove(index)}
                    rootChild={!!root}
                    root={false}
                    index={index}
                    group={fields.get(index)}
                    controllingQuestions={controllingQuestions(fields, index)}
                    move={(dragIndex, hoverIndex) => fields.move(dragIndex, hoverIndex)}
                    {...rest}
                    />
                </FormSection>
              );
            }
            else {
              return (
                <FormSection key={groupElement} name={groupElement}>
                  <QuestionForm
                    onRemove={() => fields.remove(index)}
                    rootChild={!!root}
                    root={false}
                    index={index}
                    question={fields.get(index)}
                    controllingQuestions={controllingQuestions(fields, index)}
                    move={(dragIndex, hoverIndex) => fields.move(dragIndex, hoverIndex)}
                    {...rest} />
                </FormSection>
              );
            }
          })
        }
        <FormSectionActions onAddField={addQuestion} onAddForm={addQuestionGroup} />
      </div>
    </div>
  )
}

export default compose(
  DragDropContext(HTML5Backend),
  withStyles(styles)
)(QuestionGroupList);