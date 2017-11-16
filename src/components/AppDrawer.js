import React from 'react';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AssignmentIcon from 'material-ui-icons/Assignment';
import LanguageIcon from 'material-ui-icons/Language';
import PersonIcon from 'material-ui-icons/Person';
import AppDrawerNavLink from './AppDrawerNavLink';
import { permissions } from '../constants';
import WithPermission from './WithPermission';

const styles = theme => ({
  paper: {
    width: 250,
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  toolbar: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    }
  },
  
});

function AppDrawer({ classes, mobileOpen, onRequestClose }) {
  const renderNavItems = () => {
    return (
      <div>
        <AppDrawerNavLink
          path="/"
          label="My Surveys"
          IconComponent={AssignmentIcon} />
        <WithPermission
          permission={permissions.CHANGE_LANGUAGE}>
          <AppDrawerNavLink
            path="/languages"
            label="Language Admin"
            IconComponent={LanguageIcon} />
        </WithPermission>
        <WithPermission
          permission={permissions.CHANGE_PERMISSION}>
          <AppDrawerNavLink
            path="/users"
            label="Manage Users"
            IconComponent={PersonIcon} />
        </WithPermission>
      </div>
    )
  };
  const drawer = (
    <div>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} type="title">
          AhadooCollect
        </Typography>
      </Toolbar>
      <Divider />
      { renderNavItems() }
    </div>
  );

  return (
    <div>
      <Hidden lgUp>
        <Drawer
          classes={{
            paper: classes.paper,
          }}
          type="temporary"
          open={mobileOpen}
          onRequestClose={onRequestClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="css">
        <Drawer
          classes={{
            paper: classes.paper
          }}
          type="permanent"
          open
          >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default withStyles(styles)(AppDrawer);