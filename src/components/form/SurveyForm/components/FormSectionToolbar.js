import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  grow: {
    flex: 1,
  }
})

function FormSectionToolbar({ classes, title, onAddField, onAddForm }) {
  return (
    <AppBar position="static">
      <Toolbar>
        { title && 
          <Typography type="subheading" color="inherit">
            { title }
          </Typography>
        }
        <div className={classes.grow} />
        { !!onAddField && 
          <IconButton dense color="contrast" className={classes.button} onClick={onAddField}>
            <AddIcon />
          </IconButton>
        }
        { !!onAddForm && 
          <IconButton dense color="contrast" className={classes.button} onClick={onAddForm}>
            <PlaylistAddIcon />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(FormSectionToolbar);