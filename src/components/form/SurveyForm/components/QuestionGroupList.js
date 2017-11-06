import React, { Component } from 'react';
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuestionGroup from './QuestionGroup';
import QuestionForm from './QuestionForm';
import PasteArea from './PasteArea';
import Overlay from 'components/Overlay';
import { uuidv4 } from 'utils';
import DragDroppable from '../containers/DragDroppable';
import { 
  copyFormGroupElement,
  showPopup,
  clearClipboard } from 'actions';
import { getElementFromClipboard } from 'reducers';

const styles = (theme) => ({
  clipboardOccupied: {
    cursor: 'not-allowed',
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  actions: {
    position: 'relative',
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

const mapStateToProps = (state) => ({
  clipboardElement: getElementFromClipboard(state), 
});

const mapDispatchToProps = (dispatch) => ({
  copyElementToClipboard(element){
    dispatch(copyFormGroupElement(element));
    dispatch(showPopup(`${element.schema === 'question' ? 'Question' : 'Group'} copied to clipboard`));
  },
  clearElementClipboard() {
    dispatch(clearClipboard());
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

  copyElement = (index) => {
    const { uuid, ...rest } = this.props.fields.get(index);
    this.props.copyElementToClipboard({ uuid: uuidv4(), ...rest });
  }

  cutElement = (element, index) => {
    const { fields, copyElementToClipboard } = this.props;

    copyElementToClipboard(element);
    fields.remove(index);
  }

  pasteElement = (index) => {
    const { fields, clipboardElement } = this.props;
    if(fields.length === 0 || index >= fields.length) {
      fields.push(clipboardElement);
    }
    else {
      fields.insert(index, clipboardElement);
    }
    this.props.clearElementClipboard();
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
    const { fields, root, groupId, disableFields = false, clipboardElement } = this.props;
    const ElementComponent = schema === 'group' ? QuestionGroup : QuestionForm;
    const field = fields.get(index);
    const elemProps = schema === 'group' ? 
      { id: uuid, group: field } :
      { question: field };
    return (
      <FormSection key={uuid} name={name}>
        <DragDroppable
          id={uuid}
          index={index}
          onMove={this.onMove}
          itemType={groupId}
          render={(isOver, enableDragSource, disableDragSource) => 
            <div>
              <ElementComponent
                onRemove={() => fields.remove(index)}
                rootChild={!!root}
                root={false}
                index={index}
                controllingQuestions={this.getControllingQuestions(index)}
                disableFields={!!clipboardElement || isOver || disableFields}
                onFieldMouseEnter={disableDragSource}
                onFieldMouseLeave={enableDragSource}
                onCopy={() => this.copyElement(index)}
                onCut={() => this.cutElement(field, index)}
                {...elemProps}
                {...props}
                />
              { 
                !!clipboardElement && 
                <PasteArea 
                  title={`Paste ${clipboardElement.schema === 'question' ? 'Question' : 'Group'}`}
                  onClick={() => this.pasteElement(index+1)} /> 
              }
            </div>
          } />
      </FormSection>
    )
  }

  render() {
    const { classes, fields, root, meta: { dirty, error }, clipboardElement, ...rest } = this.props;

    return (
      <div className={classnames({[classes.clipboardOccupied]: !!clipboardElement })}>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        { 
          !!clipboardElement && 
          <PasteArea 
            title={`Paste ${clipboardElement.schema === 'question' ? 'Question' : 'Group'}`}
            onClick={() => this.pasteElement(0)} /> 
        }
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
            { !!clipboardElement && <Overlay />}
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(QuestionGroupList);