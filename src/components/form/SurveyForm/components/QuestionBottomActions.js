import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui-icons/Add';
import AddGroupIcon from 'material-ui-icons/PlaylistAdd';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';

class QuestionBottomActions extends Component {
  render() {
    const { withElevation = true, onAddClick, onAddGroupClick } = this.props;

    return (
      <Paper elevation={withElevation ? 2 : 0}>
        <Tooltip title="Add Question" placement="bottom">
          <IconButton onClick={onAddClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Group" placement="bottom">
          <IconButton onClick={onAddGroupClick}>
            <AddGroupIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    );
  }
}

export default QuestionBottomActions;