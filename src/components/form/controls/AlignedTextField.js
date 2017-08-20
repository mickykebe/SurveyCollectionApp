import React from 'react';
import classnames from 'classnames';
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
  const { classes, className: classNameProp, ...fieldProps } = props;
  return (<TextField 
    {...fieldProps} 
    className={classnames(classNameProp, classes.root)} 
    InputClassName={classes.Input} 
    labelClassName={classes.label} />);
}

export default withStyles(styles)(AlignedTextField);