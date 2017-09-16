import React from 'react';
import Typography from 'material-ui/Typography';
import { valFromLangObj } from '../utils';
import AnswerValue from './AnswerValue';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  question: {
    paddingBottom: theme.spacing.unit,
  }
});

function Answer({ classes, question, answer }) {
  return (
    <div className={classes.root}>
      <Typography type="body2" className={classes.question}>
        {`Q: ${valFromLangObj(question.title)}`}
      </Typography>
      <AnswerValue
        question={question}
        value={answer.answer} />
    </div>
  );
}

export default withStyles(styles)(Answer);