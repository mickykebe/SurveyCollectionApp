import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = {
  progress: {
    display: 'block',
    margin: '0 auto',
  },
};

function AppCircularProgress({ classes, ...props }) {
  return (
    <CircularProgress className={classes.progress} color="accent" {...props} />
  );
}

export default withStyles(styles)(AppCircularProgress);