import React, { Component } from 'react';
import { compose } from 'redux';
import { findDOMNode } from 'react-dom';
import { FormSection } from 'redux-form';
import { DragSource, DropTarget } from 'react-dnd';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FunctionIcon from 'material-ui-icons/Functions';
import LangTextField from './LangTextField';
import QuestionTypeContainer from '../containers/QuestionTypeContainer';
import ConditionCollapse from './ConditionCollapse';
import { DragItemType } from '../../../../constants';
import { valFromLangObj } from 'utils';

const styles = (theme) => ({
  root: {
    margin: '16px',
  },
  actionButton: {
    margin: theme.spacing.unit,
  },
  titleLabel: {
    flex: 1,
  },
  inputs: {
    flex: 3,
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  overflow: {
    overflow: 'visible',
  },
  dragging: {
    opacity: 0,
  }
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    const conditionExpand = this.props.question.condition.conditions.length > 0;
    this.state = { expanded: conditionExpand };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, question, index, formLanguages, controllingQuestions } = this.props;
    const { onRemove } = this.props;

    return (
      <div>
        <CardContent>
          <Typography type="subheading" align="center">
            {`${index+1}) Question: ${valFromLangObj(question.title)}`}
          </Typography>
          <FormSection name="title">
            <LangTextField
              label="Title"
              languages={formLanguages}
              labelClassName={classes.titleLabel}
              inputGroupClassName={classes.inputs}
              required={true} />
          </FormSection>
          <QuestionTypeContainer
            activeQuestionType={question.type}
            controllingQuestions={controllingQuestions}
            formLanguages={formLanguages} />
        </CardContent>
        <Divider />
        <CardActions>
          { controllingQuestions.length &&
            <IconButton onClick={this.handleExpandClick}>
              <FunctionIcon />
            </IconButton>
          }
          <div className={classes.flexGrow} />
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <FormSection name="condition">
          <ConditionCollapse
            expanded={this.state.expanded}
            controllingQuestions={controllingQuestions} />
        </FormSection>
      </div>
    );
  }
}

function CardWrapper(props) {
  const { classes, isDragging, connectDropTarget, connectDragSource } = props;
  let Comp;
  if(props.rootChild) {
    Comp = (
      <Card className={props.classes.root}>
        <QuestionForm {...props} />
      </Card>
      );
  }
  else {
    Comp = <QuestionForm {...props} />;
  }

  let containerClassName = '';
  if(isDragging) {
    containerClassName = classes.dragging;
  }

  return connectDragSource(
    connectDropTarget(<div className={containerClassName}>{Comp}</div>),
  );
}

const elementSource = {
  beginDrag(props) {
    return {
      id: props.question.uuid,
      index: props.index
    }
  }
}

const elementTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.move(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
  },
}

export default compose(
  DropTarget(DragItemType.GROUP_ELEMENT, elementTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(DragItemType.GROUP_ELEMENT, elementSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  withStyles(styles)
)(CardWrapper);