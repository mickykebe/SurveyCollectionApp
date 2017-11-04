import React, { Component } from 'react';
import ButtonBase from 'material-ui/ButtonBase';
import PasteIcon from 'material-ui-icons/ContentPaste';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    margin: `${theme.spacing.unit * 3}px 0`,
    display: 'flex',
    minHeight: theme.spacing.unit * 6,
    border: `1px dashed ${theme.palette.common.lightBlack}`,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  },
  pasteIcon: {
    marginRight: theme.spacing.unit,
  }
});

class PasteArea extends Component {
  render() {
    const { classes, title, onClick } = this.props;
    return (
      <ButtonBase 
        focusRipple
        className={classes.root}
        onClick={onClick}>
        <PasteIcon className={classes.pasteIcon} />
        <Typography type="subheading">
          {
            title || 'Paste'
          }
        </Typography>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(PasteArea);