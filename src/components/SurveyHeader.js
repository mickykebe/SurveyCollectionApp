import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import OverlayLoading from './OverlayLoading';
import { valFromLangObj } from '../utils';

const Content = ({ classes, id, title, description }) => {
  return (
    <div>
      <Typography type="headline" component="h1" align="center" className={classes.text}>
        { valFromLangObj(title) }
      </Typography>
      <Typography type="subheading" color="secondary" align="center" className={classes.text}>
        { valFromLangObj(description) }
      </Typography>
    </div>
  );
}

const styles = theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing.unit * 4
  },
  text: {
    overflowWrap: 'break-word',
  }
});

function SurveyHeader({ classes, inProgress, error, onRetry, survey }) {
  return (
    <Paper className={classes.root}>
      {
        survey && <Content {...survey} classes={classes} />
      }
      {
        inProgress && <OverlayLoading />
      }
    </Paper>
  );
}

export default withStyles(styles)(SurveyHeader);