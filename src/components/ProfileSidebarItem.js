import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Avatar from 'material-ui/Avatar';
import { 
  ListItem,
  ListItemText 
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({
  userIcon: {
    width: '100%',
    height: '100%',
  },
  arrowIcon: {
    color: theme.palette.common.lightBlack,
  }
});

class ProfileSidebarItem extends Component {
  render() {
    const { classes, history, id, firstName, lastName, username } = this.props;

    return (
      <ListItem button onClick={() => history.push(`/users/${id}`)}>
        <Avatar>
          <AccountCircleIcon className={classes.userIcon} />
        </Avatar>
        <ListItemText
          primary={`${firstName} ${lastName}`}
          secondary={`${username}`}
          />
        <RightArrowIcon className={classes.arrowIcon} />
      </ListItem>
    );
  }
}



export default compose(
  withRouter,
  withStyles(styles)
)(ProfileSidebarItem);
