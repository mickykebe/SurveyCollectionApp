import React, { Component } from 'react';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PersonIcon from 'material-ui-icons/PersonOutline';
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
          loading && profiles.length === 0 &&
          <OverlayLoading />
        }
        {
          error &&
          <OverlayError
            text="Problem occurred fetching profiles"
            retry={retry} />
        }
        {
          !loading && !error && profiles.length === 0 &&
          <OverlayError
            Icon={PersonIcon}
            text="No members available" />
        }
      </List>
    );
  }
}

export default withStyles(styles)(ProfilesSidebar);