import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { valFromObject } from 'utils';

const styles = theme => ({

});

function SurveyResponse({ survey }) {
  return (
    <div>
      <Paper>
        <Typography type="headline">
          {survey.title}
        </Typography>
        <Typography type="subheading">
          {survey.description}
        </Typography>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(ResponseList);