import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { valFromLangObj } from 'utils';
import Loading from './Loading';
import PagerLayout from './PagerLayout';
import SurveyHeader from './SurveyHeader';
import AnswerList from './AnswerList';

const styles = theme => ({
  root: {
    maxWidth: '850px',
    margin: '0 auto',
  },
  responseListContainer: {
    position: 'relative',
    marginTop: theme.spacing.unit * 2,
  }
});

class ResponsePage extends Component {
  constructor(props) {
    super(props);

    this.state = { curIndex: 0 };
  }

  render() {
    const { classes, id, survey, responses, fetchingSurvey, fetchingResponses } = this.props;
    const currentAnswers = responses[this.state.curIndex] && responses[this.state.curIndex].answers;
    return (
      <div className={classes.root}>
        <SurveyHeader
          survey={survey}
          inProgress={fetchingSurvey} />
        <Paper className={classes.responseListContainer}>
          <Toolbar>
            <Typography type="title">
              Responses
            </Typography>
          </Toolbar>
          <PagerLayout>
            {
              currentAnswers &&
              <AnswerList answers={currentAnswers} />
            }
          </PagerLayout>
          {
            fetchingResponses && <Loading />
          }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ResponsePage);