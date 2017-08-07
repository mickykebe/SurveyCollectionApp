import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    width: '50%',
    minWidth: '360px',
    margin: '0 auto',
    background: theme.palette.background.paper,
  }
}))

class MenuSelectField extends Component {
  constructor(props) {
    super(props);

    this.state = { anchorEl: undefined, open: false, }
    this.getActiveOption = this.getActiveOption.bind(this);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  getActiveOption(value, options) {
    return options.find((option) => option.val === value);
  }

  getActiveOptionIndex(value, options) {
    for(let i = 0; i < options.length; i++) {
      if(options[i].val === value)
        return i;
    }
    return 0;
  }

  handleControlClick(e) {
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleMenuClose() {
    this.setState({ open: false });
  }

  handleMenuItemClick(e, val) {
    this.props.onChange(val);
    this.setState({ open: false });
  }

  render() {
    const { classes, label, value, options } = this.props;
    const activeOption = this.getActiveOption(value, options);
    const activeOptionIndex = this.getActiveOptionIndex(value, options);

    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            onClick={this.handleControlClick}>
            <ListItemText
              primary={label}
              secondary={activeOption ? activeOption.label : ''} />
          </ListItem>
        </List>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleMenuClose}>
          {
            options.map(({ val, label }, index) => 
              <MenuItem
                key={val}
                selected={index === activeOptionIndex}
                onClick={e => this.handleMenuItemClick(e, val)}>
                { label }
              </MenuItem>)
          }
        </Menu>
      </div>
    )
  }
}

export default withStyles(stylesheet)(MenuSelectField);