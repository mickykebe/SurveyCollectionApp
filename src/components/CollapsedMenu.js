import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class CollapsedMenu extends Component {
  state = {
    anchorEl: null,
    open: false,
  }
  handleMenuClose = () => {
    this.setState({ open: false });
  }
  render() {
    return (
      <div>
        <IconButton
          onClick={e => this.setState({ open: true, anchorEl: e.currentTarget })}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleMenuClose}>
          {this.props.render(this.handleMenuClose)}
        </Menu>
      </div>
    );
  }
}

export default CollapsedMenu;