import React, { Component } from 'react';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Overlay from './Overlay'
import ProfileSidebarItem from './ProfileSidebarItem';

const styles = theme => ({
  root: {
    position: 'relative',
    maxWidth: 360,
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
    const { classes, loading, error, profiles } = this.props;

    return (
      <List className={classes.root}>
        {/* <Overlay spinner={true} /> */}
        {
          profiles.map(profile => this.renderUser(profile))
        }
        { 
          profiles.length === 0 && loading &&
          <Overlay spinner={true} />
        }
        {
          error &&
          <span>Problem occurred fetching profiles</span>
        }
      </List>
    );
  }
}

export default withStyles(styles)(ProfilesSidebar);