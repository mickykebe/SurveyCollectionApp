import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Overlay from './Overlay';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  loadingText: {
    color: theme.palette.common.lightBlack,
    padding: '32px',
  }
});

function OverlayLoading(props) {
  const { classes, text, classes: { spinner: spinnerCls } = { spinnerCls: ''} } = props;
  return (
    <Overlay>
      <div className={classes.root}>
        <CircularProgress className={spinnerCls} color="accent" />
        {
          !!text &&
          <Typography className={classes.loadingText} type="body2" align="center">
            {text}
          </Typography>
        }
      </div>
    </Overlay>
  );
}

export default withStyles(styles)(OverlayLoading);