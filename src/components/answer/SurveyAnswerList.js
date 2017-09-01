import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    background: theme.palette.background.paper,
  },
});

function SurveyAnswer(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem button onClick={props.onResponseClick} divider={true}>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <ListItemText primary="001" secondary="Jan 9, 2016" />
        </ListItem>
        <ListItem button onClick={props.onResponseClick} divider={true} >
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <ListItemText primary="002" secondary="Jan 9, 2016" />
        </ListItem>
        
      </List>
    </div>
  );
}

SurveyAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyAnswer);

