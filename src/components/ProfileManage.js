import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ProfileManageUserContainer from '../containers/ProfileManageUserContainer'

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing.unit * 4,
    flex: 1,
  },
});

class ProfileManage extends Component {
  render() {
    const { classes, profile } = this.props;

    return (
      <div className={classes.root}>
        <ProfileManageUserContainer
          profile={profile} />
      </div>
    )
  }
}

export default withStyles(styles)(ProfileManage);