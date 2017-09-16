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
  },
  grow: {
    flex: 1,
  },
  emptyResponses: {
    minHeight: '50px'
  }
});

class ResponsePage extends Component {
  constructor(props) {
    super(props);

    this.state = { curIndex: 0 };
    this.onPrevPageClick = this.onPrevPageClick.bind(this);
    this.onNextPageClick = this.onNextPageClick.bind(this);
  }

  onPrevPageClick() {
    this.setState({
      curIndex: this.state.curIndex - 1,
    });
  }

  onNextPageClick() {
    this.setState({
      curIndex: this.state.curIndex + 1,
    })
  }

  render() {
    const { classes, id, survey, responses, responseCount, fetchingSurvey, fetchingResponses } = this.props;
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
            <div className={classes.grow} />
            { 
              !!responses.length &&
              <Typography type="body1">
                {`${this.state.curIndex + 1}/${responses.length}`}
              </Typography>
            }
          </Toolbar>
          {
            !!responses.length && 
            <PagerLayout
              onPrev={responses[this.state.curIndex-1] && this.onPrevPageClick}
              onNext={responses[this.state.curIndex+1] && this.onNextPageClick}>
              {
                currentAnswers &&
                <AnswerList answers={currentAnswers} />
              }
            </PagerLayout>
          }
          {
            !responses.length &&
            <Typography type="subheading" align="center" className={classes.emptyResponses}>
              No responses have been filled out yet.
            </Typography>
          }
          {
            fetchingResponses && <Loading />
          }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ResponsePage);