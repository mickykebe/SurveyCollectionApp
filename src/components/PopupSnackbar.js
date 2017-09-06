import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import CloseIcon from 'material-ui-icons/Close';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  popupActions: {
    display: 'flex',
  }
});

class PopupSnackbar extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { show: false };
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      show: this.props.show
    });
  }

  handleSnackbarClose(e, reason) {
    if(reason === 'clickaway')
      return;
    
    if(this.props.onClose) {
      this.props.onClose();
    }
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
    const { classes, retryAction } = this.props;
    return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.state.show}
      autoHideDuration={6e3}
      onRequestClose={this.handleSnackbarClose}
      message={<span id='message-id'>{this.props.message}</span>}
      transition={<Slide direction='up' />}
      action={
        <div className={classes.popupActions}>
          {
          !!retryAction &&
            <Button key="retry" color="accent" dense onClick={retryAction}>
              RETRY
            </Button>
          }
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={this.handleSnackbarClose}>
            <CloseIcon />
          </IconButton>
        </div>
      } />
  }
}

export default withStyles(styles)(PopupSnackbar);