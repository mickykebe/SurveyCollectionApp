import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from 'material-ui/Dialog';

class ConfirmDialog extends Component {
  constructor(props) {
    super(props);

    this.confirmClick = this.confirmClick.bind(this);
  }

  confirmClick() {
    this.props.onConfirmClick();
    this.props.onRequestClose();
  }

  render() {
    const { open, text, onRequestClose } = this.props;

    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { text }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.confirmClick}>
            Yes
          </Button>
          <Button onClick={onRequestClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;