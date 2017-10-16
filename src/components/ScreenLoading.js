import React from 'react';
import AppCircularProgress from './AppCircularProgress';
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
  loadingText: {
    color: theme.palette.common.lightBlack,
    padding: '32px',
  }
});

function ScreenLoading(props) {
  const { classes, text } = props;
  return (
    <div className={classes.root}>
      <AppCircularProgress />
      <Typography className={classes.loadingText} type="body2" align="center">
        {text}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(ScreenLoading);