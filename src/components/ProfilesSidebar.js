import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import OverlayError from './OverlayError';
import OverlayLoading from './OverlayLoading';
import ProfileSidebarItem from './ProfileSidebarItem';

const styles = theme => ({
  root: {
    flexDirection: 'column',
    overflowY: 'auto',
    flex: '0 360px',
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.common.faintBlack}`
  }
});

class ProfilesSidebar extends Component {
  renderUser = (profile) => {
    const { uuid:id, user } = profile;
    return <ProfileSidebarItem
      key={id}
      id={id}
      firstName={user.first_name}
      lastName={user.last_name}
      username={user.username} />;
  }

  render() {
    const { classes, loading, error, profiles, retry } = this.props;

    return (
      <List
        className={classes.root}>
        {
          profiles.map(profile => this.renderUser(profile))
        }
        { 
          profiles.length === 0 && loading &&
          <OverlayLoading />
        }
        {
          error &&
          <OverlayError
            text="Problem occurred fetching profiles"
            retry={retry} />
        }
      </List>
    );
  }
}

export default withStyles(styles)(ProfilesSidebar);