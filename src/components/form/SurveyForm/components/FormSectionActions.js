import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
  }
});

function FormSectionActions({ classes, onAddField, onAddForm }) {
  return (
    <div className={classes.root}>
      <Button fab color="accent" className={classes.button} onClick={onAddField}>
        <AddIcon />
      </Button>
      { !!onAddForm && 
        <Button fab color="accent" className={classes.button} onClick={onAddForm}>
          <PlaylistAddIcon />
        </Button>
      }
    </div>
  );
}

export default withStyles(styles)(FormSectionActions);