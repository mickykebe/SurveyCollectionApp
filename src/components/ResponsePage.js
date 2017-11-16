import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CollapsedMenu from './CollapsedMenu';
import OverlayLoading from './OverlayLoading';
import PagerLayout from './PagerLayout';
import SurveyHeader from './SurveyHeader';
import AnswerList from './AnswerList';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import api from '../api';

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
  },
  toolbar: {
    paddingRight: theme.spacing.unit,
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
      hasMore,
      downloadResponses
     } = this.props;
    const { curIndex } = this.state;
    const currentAnswers = responses[curIndex] && responses[curIndex].answers;

    return (
      <div className={classes.root}>
        <SurveyHeader
          survey={survey}
          inProgress={fetchingSurvey} />
        <Paper className={classes.responseListContainer}>
          <Toolbar className={classes.toolbar}>
            <Typography type="title">
              Responses
              { 
                !!responses.length &&
                `(${this.state.curIndex + 1}/${responsesCount})`
              }
            </Typography>
            <div className={classes.grow} />
            <CollapsedMenu
              render={(handleMenuClose) => {
                return (
                  [
                    <MenuItem onClick={() => {
                      downloadResponses('csv');
                      handleMenuClose();
                    }}>
                      <IconButton>
                        <FileDownloadIcon />
                      </IconButton>
                      Download responses (.csv)
                    </MenuItem>,
                    <MenuItem onClick={() => {
                      downloadResponses('xlsx');
                      handleMenuClose();
                    }}>
                      <IconButton>
                        <FileDownloadIcon />
                      </IconButton>
                      Download responses (.xlsx)
                    </MenuItem>
                  ])
              }}>
              
            </CollapsedMenu>
          </Toolbar>
          {
            !!responses.length && 
            <PagerLayout
              hasPrev={curIndex > 0}
              hasNext={curIndex+1 < responsesCount || hasMore}
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
            fetchingResponses && <OverlayLoading />
          }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ResponsePage);