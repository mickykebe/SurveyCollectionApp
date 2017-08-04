import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const stylesheet = createStyleSheet(() => ({
  root: {
    padding: '30px'
  }
}));

class SurveyForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <TextField
          required={true}
          label="Survey Title"
          placeholder="Survey Title"
          inputProps={{required: true}}
          fullWidth={true}
          margin="normal"
          />
        <TextField
          label="Description"
          placeholder="Description"
          fullWidth={true}
          margin="normal" />
      </Paper>
    );
  }
}

export default withStyles(stylesheet)(SurveyForm);