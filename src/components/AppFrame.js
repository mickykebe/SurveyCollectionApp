import React, { Component } from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import AppDrawer from './AppDrawer';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  appBar: {
    transition: theme.transitions.create('width'),
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    }
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    }
  },
  navIconButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    }
  },
  grow: {
    flex: '1 1 auto',
  },
  content: {
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    paddingTop: '80px',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  contentShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: '250px',
      width: 'calc(100% - 250px)',
    }
  }
});

class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.state = { drawerOpen: false };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerClose() {
    this.setState({
      drawerOpen: false,
    });
  }

  handleDrawerToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    const { classes, disableDrawer = false, children, appBarTitle, currentUser } = this.props;
    const appBarClassName = classNames(classes.appBar, { [classes.appBarShift]: !disableDrawer });
    const contentClassName = classNames(classes.content, { [classes.contentShift]: !disableDrawer});
    return (
      <div className={classes.root}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            {
              !disableDrawer &&
              <IconButton
                color="contrast"
                onClick={this.handleDrawerToggle}
                className={classes.navIconButton}>
                <MenuIcon />
              </IconButton>
            }
            <Typography type="title" color="inherit">
              {appBarTitle || 'AhadooCollect'}
            </Typography>
            <div className={classes.grow} />
            { !!currentUser && <LoggedInMenu currentUser={currentUser} /> }
            { !currentUser && <LoggedOutMenu />}
          </Toolbar>
        </AppBar>
        { 
          !disableDrawer &&
          <AppDrawer
            className={classes.drawer}
            mobileOpen={this.state.drawerOpen}
            onRequestClose={this.handleDrawerClose} />
        }
        <div className={contentClassName}>
        {children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(AppFrame);