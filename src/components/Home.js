import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import AppBar from 'material-ui/AppBar';
import Content from './Content';
import SurveyTableContainer from '../containers/SurveyTableContainer';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AddIcon from 'material-ui-icons/Add';
import CheckIcon from 'material-ui-icons/CheckCircle';
import PencilIcon from 'material-ui-icons/Create';

const styles = theme => ({
  addButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  }
})

class Home extends Component {
  state = {
    tab: 0,
  }
  onTabChange = (e, val) => {
    this.setState({ tab: val });
  }

  render () {
    const { classes, history } = this.props;
    const { tab } = this.state;
    return (
      <Content>
        <Paper>
          <AppBar position="static" color="default" elevation={2}>
            <Tabs
              value={tab}
              onChange={this.onTabChange}
              indicatorColor="accent"
              textColor="accent"
              centered>
              <Tab label="Published Surveys" icon={<CheckIcon />}/>
              <Tab label="Pending Surveys" icon={<PencilIcon />} />
            </Tabs>
          </AppBar>
          { tab === 0 && <SurveyTableContainer published={true} /> }
          { tab === 1 && <SurveyTableContainer published={false} /> }
          <Button fab color="accent" onClick={() => history.push('/surveys/new')} className={classes.addButton}>
            <AddIcon />
          </Button>
        </Paper>
      </Content>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Home);