import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Loading from './Loading';
import { valFromLangObj } from '../utils';

const Content = ({ id, title, description }) => {
  return (
    <div>
      <Typography type="headline" component="h1" align="center">
        { valFromLangObj(title) }
      </Typography>
      <Typography type="subheading" color="secondary" align="center">
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
});

function SurveyHeader({ classes, inProgress, error, onRetry, survey }) {
  return (
    <div>
      <Paper className={classes.root}>
        {
          survey && <Content {...survey} />
        }
        {
          inProgress && <Loading />
        }
      </Paper>
    </div>
  );
}

export default withStyles(styles)(SurveyHeader);