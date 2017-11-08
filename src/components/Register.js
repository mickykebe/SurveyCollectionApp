import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import CompanyIcon from 'material-ui-icons/AccountBalance';
import { withStyles } from 'material-ui/styles';
import CompanyRegisterContainer from '../containers/CompanyRegisterContainer';
import MemberRegisterContainer from '../containers/MemberRegisterContainer';
import logo from '../images/logo.png';

const styles = theme => ({
  root: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  content: {
    padding: theme.spacing.unit * 4,
  },
  logo: {
    display: 'block',
    width: '75%',
    margin: `0 auto ${theme.spacing.unit * 2}px`,
  }
});

class Register extends Component {
  state = {
    tabIndex: 0,
  }

  render() {
    const { isAuthenticating, classes } = this.props;
    const { tabIndex } = this.state;

    return (
      <Paper className={classes.root}>
        { isAuthenticating && 
          <LinearProgress color="accent" />
        }
        <AppBar
          position="static"
          color="default"
          elevation={1}>
          <Tabs
            value={this.state.tabIndex}
            onChange={(e, val) => this.setState({ tabIndex: val })}
            fullWidth
            indicatorColor="accent"
            textColor="accent">
            <Tab icon={<PersonAddIcon />} label="Member Register" />
            <Tab icon={<CompanyIcon />} label="Company Register" />
          </Tabs>
        </AppBar>
        <div className={classes.content}>
          <img src={logo} className={classes.logo} alt="logo"/>
          {
            tabIndex === 0 &&
            <MemberRegisterContainer
              isAuthenticating={isAuthenticating} />
          }
          {
            tabIndex === 1 &&
            <CompanyRegisterContainer
              isAuthenticating={isAuthenticating} />
          }
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Register);