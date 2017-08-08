import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Field } from 'redux-form';
import { FormGroup } from 'material-ui/Form';
import { renderTextField } from './fieldRenderers';

const stylesheet = createStyleSheet(() => ({
  gap: {
    padding: '0 20px',
  }
}));

class NumberRangeAnswer extends Component {
  render() {
    const { classes, question } = this.props;
    return (
      <FormGroup row>
        <Field
          name={`${question}.start`}
          component={renderTextField}
          label="From"
          margin="normal"
          />
        <div className={classes.gap}></div>
        <Field
          name={`${question}.end`}
          component={renderTextField}
          label="To"
          margin="normal"
          />
      </FormGroup>
    );
  }
}

export default withStyles(stylesheet)(NumberRangeAnswer);