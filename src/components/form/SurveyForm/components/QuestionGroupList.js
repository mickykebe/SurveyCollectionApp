import React, { Component } from 'react';
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';
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

    this.onMove = this.onMove.bind(this);
    this.getControllingQuestions = this.getControllingQuestions.bind(this);
  }

  addQuestion = (fields, i = fields.length) => {
    const question = {
      uuid: uuidv4(),
      schema: 'question',
      type: 'text',
      condition: { operator: '&&', conditions: [] },
      required: true,
    };
    fields.insert(i, question);
  }

  addQuestionGroup = (fields, i = fields.length) => {
    const group = { 
      uuid: uuidv4(), 
      schema: 'group',
      condition: { operator: '&&', conditions: [] },
      groupElements: [{ 
        uuid: uuidv4(), 
        schema: 'question',
        type: 'text',
        condition: { operator: '&&', conditions: [] },
        required: true,
      }] 
    };
    fields.insert(i, group);
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
    this.props.fields.move(dragIndex, hoverIndex);
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
                hideRemoveButton={fields.length === 1}
                onRemove={() => fields.remove(index)}
                onAddQuestion={() => this.addQuestion(fields, index+1)}
                onAddGroup={() => this.addQuestionGroup(fields, index+1)}
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