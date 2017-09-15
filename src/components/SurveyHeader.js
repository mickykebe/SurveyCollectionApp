import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Loading from './Loading';
import PopupSnackbar from './PopupSnackbar';
import { valFromLangObj } from '../utils';

const contentStyles = theme => ({
  
})

let Content = ({ classes, id, title, description }) => {
  return (
    <div className={classes.root}>
      <Typography type="headline" component="h1" color="secondary" align="center">
        { valFromLangObj(title) }
      </Typography>
      <Typography type="subheading">
        { valFromLangObj(description) }
      </Typography>
    </div>
  );
}

Content = withStyles(contentStyles)(Content);

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
        {
          error && 
          <PopupSnackbar
            show={!inProgress && !!error}
            message="Problem occurred fetching survey"
            retryAction={onRetry} />
        }
      </Paper>
    </div>
  );
}

export default withStyles(styles)(SurveyHeader);