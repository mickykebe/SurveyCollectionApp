import React from 'react';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    paddingRight: 2,
  },
  grow: {
    flex: 1,
  },
  actions: {
    color: theme.palette.common.lightBlack,
  }
});

function TableToolbar({ classes, title, onAddClick }){
  return (
    <Toolbar className={classes.root}>
      {
        !!title &&
        <Typography type="title">
          { title }
        </Typography>
      }
      <div className={classes.grow} />
      <div className={classes.actions}>
        {
          !!onAddClick &&
          <IconButton onClick={onAddClick}>
            <AddIcon />
          </IconButton>
        }
      </div>
    </Toolbar>
  );
}

export default withStyles(styles)(TableToolbar);