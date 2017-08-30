import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CloudOffIcon from 'material-ui-icons/CloudOff';
import Button from 'material-ui/Button';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.common.lightBlack,
    display: 'block',
    width: '100px',
    height: '100px',
    margin: '0 auto',
  },
  loadingText: {
    color: theme.palette.common.lightBlack,
    paddingBottom: '32px',
  }
});

function AppLoadingError(props) {
  const { classes, retry } = props;
  return (
    <div className={classes.root}>
      <CloudOffIcon className={classes.icon} />
      <Typography className={classes.loadingText} type="body2" align="center">
        Couldn't connect to server.
      </Typography>
      { !!retry && <Button raised color="accent" onClick={retry}>Retry</Button> }
    </div>
  );
}

export default withStyles(styles)(AppLoadingError);