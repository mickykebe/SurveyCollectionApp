import React, { Component } from 'react';
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
import DragDroppable from '../containers/DragDroppable';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
});

class QuestionGroupList extends Component {
  constructor(props) {
    super(props);

    this.addQuestion = this.addQuestion.bind(this);
    this.addQuestionGroup = this.addQuestionGroup.bind(this);
    this.onMove = this.onMove.bind(this);
    this.getControllingQuestions = this.getControllingQuestions.bind(this);
  }

  addQuestion = () => {
    const fields = this.props.fields;
    fields.push({ 
      uuid: uuidv4(),
      schema: 'question', 
      index: fields.length+1,
      type: 'text',
      condition: { operator: '&&', conditions: [] }
    });
  }

  addQuestionGroup = () => {
    const fields = this.props.fields;

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

  onMove = (dragIndex, hoverIndex) => {
    const { fields: { name }, changeFieldValue } = this.props;
    const { fields } = this.props;

    fields.move(dragIndex, hoverIndex);
    const { min, max } = dragIndex > hoverIndex ? { min: hoverIndex, max: dragIndex } : { min: dragIndex, max: hoverIndex };
    for(let i = min; i <= max; i++) {
      changeFieldValue(`${name}[${i}].index`, i+1);
    }
  }

  getControllingQuestions(curIndex) {
    const { fields } = this.props;

    return fields.getAll().filter((field, index) => 
      field.schema === 'question' && index < curIndex);
  }

  renderQuestion = (uuid, index, name, props) => {
    const { fields, root, groupId, disableFields = false } = this.props;
    return (
      <FormSection key={uuid} name={name}>
        <DragDroppable 
          id={uuid}
          index={index}
          onMove={this.onMove}
          itemType={groupId}
          render={(isOver) => 
            <QuestionForm
              onRemove={() => fields.remove(index)}
              rootChild={!!root}
              root={false}
              index={index}
              question={fields.get(index)}
              controllingQuestions={this.getControllingQuestions(index)}
              disableFields={isOver || disableFields}
              {...props} />
          } />
      </FormSection>
    )
  }

  renderQuestionGroup = (uuid, index, name, props) => {
    const { fields, root, groupId, disableFields = false } = this.props;
    return (
      <FormSection key={uuid} name={name}>
        <DragDroppable 
          id={uuid}
          index={index}
          onMove={this.onMove}
          itemType={groupId}
          render={(isOver) =>
            <QuestionGroup
              id={uuid}
              onRemove={() => fields.remove(index)}
              rootChild={!!root}
              root={false}
              index={index}
              group={fields.get(index)}
              controllingQuestions={this.getControllingQuestions(index)}
              disableFields={isOver || disableFields}
              {...props}
              />
          } />
      </FormSection>
    );
  }

  render() {
    const { classes, fields, root, meta: { dirty, error }, ...rest } = this.props;

    return (
      <div>
        <FormSectionToolbar title="Questions" />
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        <div>
          {
            fields.map((groupElement, index) => {
              const { uuid, schema } = fields.get(index);
              if(schema === 'group') {
                return this.renderQuestionGroup(uuid, index, groupElement, rest);
              }
              else {
                return this.renderQuestion(uuid, index, groupElement, rest);
              }
            })
          }
          <FormSectionActions onAddField={this.addQuestion} onAddForm={this.addQuestionGroup} />
        </div>
      </div>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  withStyles(styles)
)(QuestionGroupList);