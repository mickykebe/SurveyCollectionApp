import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle';
import { logout } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

class LoggedInMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { accountMenuAnchorEl: undefined, accountMenuOpen: false };
    this.closeAccountMenu = this.closeAccountMenu.bind(this);
    this.openAccountMenu = this.openAccountMenu.bind(this);
  }

  openAccountMenu(e) {
    this.setState({
      accountMenuOpen: true,
      accountMenuAnchorEl: e.currentTarget
    });
  }

  closeAccountMenu() {
    this.setState({
      accountMenuOpen: false,
    });
  }

  render() {
    const { currentUser, logout } = this.props;
    if(currentUser) {
      return (
          <div>
            <IconButton color="contrast" onClick={this.openAccountMenu}>
              <AccountCircle style={{
                width: 35,
                height: 35
              }} />
            </IconButton>
            <Menu
              anchorEl={this.state.accountMenuAnchorEl}
              open={this.state.accountMenuOpen}
              onRequestClose={this.closeAccountMenu}>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
      );
    }
    return null;
    }
  }

LoggedInMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(LoggedInMenu);