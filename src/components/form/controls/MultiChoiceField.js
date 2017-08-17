import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormGroup, FormLabel, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  langRow: {
    marginTop: '16px',
  },
  langLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingRight: '16px',
  },
};

class MultiChoiceField extends Component {
  constructor(props) {
    super(props);

    this.getCurrentValues = this.getCurrentValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCurrentValues() {
    return this.props.value || [];
  }

  handleChange(e, val, currentValues) {
    const { onChange } = this.props;
    let values;
    if(e.target.checked){
      values = [...currentValues, val];
    }
    else {
      const index = currentValues.indexOf(val);
      values = [...currentValues.slice(0, index), ...currentValues.slice(index+1)];
    }
    onChange(values);
  }

  render() {
    const { classes, label, options, error } = this.props;
    const values = this.getCurrentValues();

    return(
      <FormControl error={!!error} className={classes.langRow}>
        <FormGroup row>
          <FormLabel className={classes.langLabel}>
            {label}
          </FormLabel>
          {
            options.map(({val, label}) => {
              const isChecked = values.indexOf(val) > -1;
              return <FormControlLabel
                key={val}
                control={
                  <Checkbox
                    checked={isChecked}
                    value={val}
                    onChange={(e) => this.handleChange(e, val, values)} />
                  }
                label={label}
                  />
            })
          }
        </FormGroup>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
  }
}

export default withStyles(styles)(MultiChoiceField);