import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

const styles = {
  root: {
    width: '100%'
  },
  grow: {
    flex: '1 1 auto',
  }
};

function Header(props) {
  const { classes, currentUser } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            AhadooCollect
          </Typography>
          <div className={classes.grow} />
          { !!currentUser && <LoggedInMenu currentUser={currentUser} /> }
          { !currentUser && <LoggedOutMenu />}
        </Toolbar>
      </AppBar>
    </div>
  )
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);