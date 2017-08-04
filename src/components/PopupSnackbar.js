import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import CloseIcon from 'material-ui-icons/Close';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const stylesheet = createStyleSheet(theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}));

class PopupSnackbar extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { show: false };
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  handleSnackbarClose() {
    this.setState({
      show: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show !== this.props.show)
    this.setState({
      show: nextProps.show
    });
  }

  render() {
    const { classes } = this.props;
    return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.state.show}
      autoHideDuration={5000}
      message={<span id='message-id'>{this.props.message}</span>}
      transition={<Slide direction='up' />}
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={this.handleSnackbarClose}>
          <CloseIcon />
        </IconButton>
      ]} />
  }
}

export default withStyles(stylesheet)(PopupSnackbar);