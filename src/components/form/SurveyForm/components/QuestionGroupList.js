import React, { Component } from 'react';
import { compose } from 'redux';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionGroup from './QuestionGroup';
import QuestionForm from './QuestionForm';
import FormSectionActions from './FormSectionActions';
import { uuidv4 } from 'utils';
import DragDroppable from '../containers/DragDroppable';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
  }
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
      condition: { operator: '&&', conditions: [] },
      required: true,
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
        condition: { operator: '&&', conditions: [] },
        required: true,
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

  renderElement = (uuid, index, schema, name, props) => {
    const { fields, root, groupId, disableFields = false } = this.props;
    const ElementComponent = schema === 'group' ? QuestionGroup : QuestionForm;
    const elemProps = schema === 'group' ? 
      { id: uuid, group: fields.get(index) } :
      { question: fields.get(index) };
    return (
      <FormSection key={uuid} name={name}>
        <DragDroppable
          id={uuid}
          index={index}
          onMove={this.onMove}
          itemType={groupId}
          render={(isOver, enableDragSource, disableDragSource) => 
            <ElementComponent
              onRemove={() => fields.remove(index)}
              rootChild={!!root}
              root={false}
              index={index}
              controllingQuestions={this.getControllingQuestions(index)}
              disableFields={isOver || disableFields}
              onFieldMouseEnter={disableDragSource}
              onFieldMouseLeave={enableDragSource}
              {...elemProps}
              {...props}
              />
          } />
      </FormSection>
    )
  }

  render() {
    const { classes, fields, root, meta: { dirty, error }, ...rest } = this.props;

    return (
      <div>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        <div>
          {
            fields.map((groupElement, index) => {
              const { uuid, schema } = fields.get(index);
              return this.renderElement(uuid, index, schema, groupElement, rest);
            })
          }
          <div className={classes.actions}>
            <Tooltip title="Add Question" placement="bottom">
              <Button fab color="accent" className={classes.button} onClick={this.addQuestion}>
                <AddIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Add Question Group" placement="bottom">
              <Button fab color="accent" className={classes.button} onClick={this.addQuestionGroup}>
                <PlaylistAddIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  withStyles(styles)
)(QuestionGroupList);