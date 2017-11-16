import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ErrorIcon from 'material-ui-icons/ErrorOutline';
import Overlay from './Overlay';

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
    width: '72px',
    height: '72px',
    margin: '0 auto',
  },
  loadingText: {
    color: theme.palette.common.lightBlack,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    display: 'block',
    margin: '0 auto',
  }
});

function OverlayError(props) {
  const { classes, text, Icon = ErrorIcon, retry } = props;
  return (
    <Overlay>
      <div className={classes.root}>
        <Icon className={classes.icon} />
        <Typography className={classes.loadingText} type="body2" align="center">
          {text}
        </Typography>
        { !!retry && <Button className={classes.button} raised dense color="accent" onClick={retry}>Retry</Button> }
      </div>
    </Overlay>
  );
}

export default withStyles(styles)(OverlayError);