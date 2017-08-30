import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Radio from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import LangTextField from '../LangTextField';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
  },
  control: {
    marginRight: theme.spacing.unit,
  },
  inputs: {
    flex: 2,
  }
});

class ChoiceAnswer extends Component {
  render() {
    const { classes, choiceType, formLanguages, onRemove} = this.props;
    const Control = choiceType === 'single' ? Radio : Checkbox;
    
    return (
      <div className={classes.root}>
        <div className={classes.control}>
          <Control
            disabled={true} />
        </div>
        <FormSection name="text">
          <LangTextField
            languages={formLanguages}
            required={true}
            className={classes.inputs} />
        </FormSection>
        <div>
          <IconButton onClick={onRemove}>
            <DeleteIcon/>
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ChoiceAnswer);