import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit,
    overflow: 'auto',
  }
})

function Content({ classes, children }) {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

export default withStyles(styles)(Content);