import React from 'react';
import AppCircularProgress from './AppCircularProgress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: ''
  },
  loadingText: {
    color: theme.palette.common.lightBlack,
    padding: '32px',
  }
});

function Loading(props) {
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

export default withStyles(styles)(Loading);