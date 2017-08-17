import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = {
  root: {
    marginTop: '0'
  },
  label: {
    position: 'static',
  },
  Input: {
    marginTop: '0 !important',
  }
};

function AlignedTextField(props) {
  const { classes, ...fieldProps } = props;
  return (<TextField {...fieldProps} className={classes.root} InputClassName={classes.Input} labelClassName={classes.label} />);
}

export default withStyles(styles)(AlignedTextField);