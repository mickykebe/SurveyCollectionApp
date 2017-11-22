import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Radio from 'material-ui/Radio';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import LangTextField from './LangTextField';

const styles = (theme) => ({
  root: {
    padding: '8px 0 0',
  },
  main: {
    width: '100%',
    display: 'flex',
  },
  control: {
    marginRight: theme.spacing.unit,
  },
  grow: {
    flex: 1,
  },
  actions: {
    display: 'flex',
  }
});

class ChoiceAnswer extends Component {
  state = {
    actionVisible: false,
  }
  render() {
    const { 
      classes, 
      choiceType, 
      formLanguages, 
      onRemove, 
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      onAddChoiceAfter,
      onAddChoiceConditionAfter
     } = this.props;
    const Control = choiceType === 'single' ? Radio : Checkbox;
    
    return (
      <div 
        className={classes.root}
        onMouseEnter={() => this.setState({ actionVisible: true })}
        onMouseLeave={() => this.setState({ actionVisible: false })}>
        <div className={classes.main}>
          <div className={classes.control}>
            <Control
              disabled={true} />
          </div>
          <FormSection name="text">
            <LangTextField
              languages={formLanguages}
              required={true}
              className={classes.grow}
              disabled={disabled}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave} />
          </FormSection>
        </div>
        {
          this.state.actionVisible &&
          <div className={classes.actions}>
            <div className={classes.grow} />
            {
              !!onAddChoiceConditionAfter &&
              <IconButton onClick={onAddChoiceConditionAfter}>
                <PlaylistAddIcon />
              </IconButton>
            }
            <IconButton onClick={onAddChoiceAfter}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={onRemove}>
              <DeleteIcon/>
            </IconButton>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ChoiceAnswer);