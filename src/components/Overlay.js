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
  }
})

function Overlay({ classes, spinnerClass, children=null, spinner=false }) {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

export default withStyles(styles)(Overlay);