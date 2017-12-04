import React from 'react';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    flex: 1,
  }
});

function SelectField({ classes, input, meta, label, options }) {
  return (
    <FormControl error={meta.touched && !!meta.error} className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={input.value}
        onChange={e => input.onChange(e.target.value)}>
        {
          options.map(({ val, label }) => 
            <MenuItem
              key={val}
              value={val}>
              { label }
            </MenuItem>)
        }
      </Select>
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  )
}

export default withStyles(styles)(SelectField);