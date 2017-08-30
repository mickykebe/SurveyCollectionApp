import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    display: 'block',
    margin: '0 auto',
  },
  loadingText: {
    color: theme.palette.common.lightBlack,
    padding: '32px',
  }
});

function LoadingApp(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} color="accent" />
      <Typography className={classes.loadingText} type="body2" align="center">
        App loading...
      </Typography>
    </div>
  );
}

export default withStyles(styles)(LoadingApp);