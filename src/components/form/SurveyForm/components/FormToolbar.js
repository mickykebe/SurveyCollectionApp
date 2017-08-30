import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
  flexGrow: {
    flex: '1 1 auto',
  },
  title: {
    color: theme.palette.shades.dark.text.primary,
  },
});

function FormToolbar({ classes, title, onAddField, onAddForm }) {
  return (
    <AppBar position="static">
      <Toolbar>
        { title && 
          <Typography type="subheading" className={classes.title}>
            { title }
          </Typography>
        }
        <div className={classes.flexGrow} />
        <IconButton onClick={onAddField} color="contrast">
          <AddIcon />
        </IconButton>
        { !!onAddForm && 
          <IconButton onClick={onAddForm} color="contrast">
            <PlaylistAddIcon />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(FormToolbar);