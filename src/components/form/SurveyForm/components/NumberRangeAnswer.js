import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Field } from 'redux-form';
import { FormGroup } from 'material-ui/Form';
import { renderTextField } from 'components/form/helper/fieldRenderers';

const styles = {
  gap: {
    padding: '0 20px',
  }
};

class NumberRangeAnswer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FormGroup row>
        <Field
          name="start"
          component={renderTextField}
          label="From"
          margin="normal"
          />
        <div className={classes.gap}></div>
        <Field
          name="end"
          component={renderTextField}
          label="To"
          margin="normal"
          />
      </FormGroup>
    );
  }
}

export default withStyles(styles)(NumberRangeAnswer);