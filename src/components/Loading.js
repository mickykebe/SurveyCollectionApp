import React from 'react';
import classNames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.lightWhite,
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
  }
});

function Loading({ classes, className }) {
  return (
    <div className={classes.root}>
      <CircularProgress className={classNames(classes.progress, className)} color="accent" />
    </div>
  )
}

export default withStyles(styles)(Loading);