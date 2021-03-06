import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import ProfileManageContainer from '../containers/ProfileManageContainer';
import ProfilesSidebarContainer from '../containers/ProfilesSidebarContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 1,
    margin: '-80px -16px 0',
    paddingTop: theme.spacing.unit * 8,
    height: '100vh'
  }
});

class ProfilesManage extends Component {
  render() {
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <ProfilesSidebarContainer />
        <Route path={`${match.url}/:profileId`} component={ProfileManageContainer} />
      </div>
    );
  }
}

export default withStyles(styles)(ProfilesManage);