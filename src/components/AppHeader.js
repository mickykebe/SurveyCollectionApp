import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


const styles = {
  root: {
    width: '100%'
  },
  grow: {
    flex: '1 1 auto',
  }
};

function AppHeader(props) {
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

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);