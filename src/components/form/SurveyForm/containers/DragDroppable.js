import React, { Component } from 'react';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const styles = {
  container: {
    opacity: 1,
  },
  dragging: {
    opacity: 0,
  }
}

class DragDroppable extends Component {
  static source = {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index,
      }
    }
  }

  static target = {
    hover(props, monitor, component) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if(dragIndex === hoverIndex) {
        return;
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
      props.onMove(dragIndex, hoverIndex)
  
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
  }

  render() {
    const { 
      classes, 
      connectDropTarget, 
      connectDragSource,
      isDragging,
      children,
    } = this.props;

    let containerClassName;
    if(isDragging) {
      console.log('dragging');
      containerClassName = classes.dragging;
    }
    else {
      containerClassName = classes.container;
    }

    return connectDragSource(
      connectDropTarget(
        <div className={containerClassName}>
          {children}
        </div>
      )
    )
  }
}

export default compose(
  DropTarget((props) => props.itemType, DragDroppable.target, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource((props) => props.itemType, DragDroppable.source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  withStyles(styles),
)(DragDroppable);