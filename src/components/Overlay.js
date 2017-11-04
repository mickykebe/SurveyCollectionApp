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
    zIndex: 100,
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
  }
})

function Overlay({ classes, spinnerClass, spinner=false }) {
  return (
    <div className={classes.root}>
      { spinner && <CircularProgress className={classNames(classes.progress, spinnerClass)} color="accent" /> }
    </div>
  );
}

export default withStyles(styles)(Overlay);