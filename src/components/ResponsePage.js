import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
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
    this.nextResponse = this.nextResponse.bind(this);
  }

  nextResponse() {
    if(this.state.curIndex + 1 >= this.props.responses.length) {
      this.props.onFetchMore();
    }
    this.setState({
      curIndex: this.state.curIndex + 1,
    });
  }

  render() {
    const { 
      classes,
      survey, 
      responses, 
      responsesCount, 
      fetchingSurvey, 
      fetchingResponses,
      hasMore
     } = this.props;
    const { curIndex } = this.state;
    const currentAnswers = responses[curIndex] && responses[curIndex].answers;

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
                {`${this.state.curIndex + 1}/${responsesCount}`}
              </Typography>
            }
          </Toolbar>
          {
            !!responses.length && 
            <PagerLayout
              hasPrev={curIndex > 0}
              hasNext={curIndex+1 < responses.length || hasMore}
              onPrev={() => this.setState({ curIndex: curIndex - 1 })}
              onNext={this.nextResponse}>
              {
                currentAnswers &&
                <AnswerList answers={currentAnswers} />
              }
            </PagerLayout>
          }
          {
            !responses.length &&
            <Typography type="subheading" align="center" className={classes.emptyResponses}>
              No responses available.
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