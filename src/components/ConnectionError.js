import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CloudOffIcon from 'material-ui-icons/CloudOff';
import Button from 'material-ui/Button';

const styles = (theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
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
    paddingBottom: '24px',
  },
  button: {
    display: 'block',
    margin: '0 auto',
  }
});

function ConnectionError(props) {
  const { classes, text, retry } = props;
  return (
    <div className={classes.root}>
      <CloudOffIcon className={classes.icon} />
      <Typography className={classes.loadingText} type="body2" align="center">
        {text}
      </Typography>
      { !!retry && <Button className={classes.button} raised color="accent" onClick={retry}>Retry</Button> }
    </div>
  );
}

export default withStyles(styles)(ConnectionError);