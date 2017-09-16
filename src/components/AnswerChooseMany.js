import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import { valFromLangObj } from '../utils';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

function AnswerChooseMany({ classes, choices }) {
  return (
    <FormControl component="fieldset">
      <div
        className={classes.group}>
        {
          choices.map(choice => 
            <FormControlLabel control={<Checkbox checked={true} disabled={true} />} label={valFromLangObj(choice.text)} />
          )
        }
      </div>
    </FormControl>
  )
}

export default withStyles(styles)(AnswerChooseMany);