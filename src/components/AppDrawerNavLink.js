import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    padding: 0,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
    },
  }),
  navLink: {
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  navLinkButton: {
    color: theme.palette.text.secondary,
    textIndent: theme.spacing.unit * 3,
    fontSize: 13,
  },
  activeButton: {
    color: theme.palette.text.primary,
  },
  buttonText: {
    padding: 0,
  },
  icon: {
    margin: 0,
  }
});

function AppDrawerNavLink({ classes, path, label, IconComponent }) {
  return (
    <Button 
      activeClassName={classes.activeButton}
      className={classNames(classes.button, classes.navLinkButton)}
      component={Link}
      to={path}
      >
      <ListItem className={classes.navLink}>
        <ListItemIcon>
          <IconComponent className={classes.icon} />
        </ListItemIcon>
        <ListItemText className={classes.buttonText} primary={label} />
      </ListItem>
    </Button>
  );
}

export default withStyles(styles)(AppDrawerNavLink);