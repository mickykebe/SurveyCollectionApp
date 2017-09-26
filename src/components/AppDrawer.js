import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AssignmentIcon from 'material-ui-icons/Assignment';
import LanguageIcon from 'material-ui-icons/Language';
import logo from '../images/logo.png';
import AppDrawerNavLink from './AppDrawerNavLink';

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
        {/*<AppDrawerNavLink
          path="/languages"
          label="Language Admin"
          IconComponent={LanguageIcon} />*/}
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