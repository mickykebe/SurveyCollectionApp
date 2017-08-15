import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import Radio from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { renderAlignedTextField } from 'components/form/helper/fieldRenderers';

const stylesheet = createStyleSheet((theme) => ({
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
}));

class ChoiceAnswer extends Component {
  render() {
    const { classes, choice, choiceType, formLanguages, onRemove, error} = this.props;
    const Control = choiceType === 'single' ? Radio : Checkbox;
    
    return (
      <div className={classes.root}>
        <div className={classes.control}>
          <Control
            disabled={true} />
        </div>
        <div className={classes.inputs}>
          {
            formLanguages.map((lang) => 
              <Field
                key={lang.code}
                name={`${choice}.text.${lang.code}`}
                component={renderAlignedTextField}
                label={`(${lang.name})`}
                required={true}
                margin="normal"
                fullWidth={true}
                />
            )
          }
          <FormHelperText error>{error}</FormHelperText>
        </div>
        <div>
          <IconButton>
            <DeleteIcon onClick={onRemove}/>
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(stylesheet)(ChoiceAnswer);