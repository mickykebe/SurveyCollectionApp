import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableCell } from 'material-ui/Table';
import CreateIcon from 'material-ui-icons/Create';
import DeleteIcon from 'material-ui-icons/Delete';
import LanguageRowForm from './LanguageRowForm';
import ConfirmDialog from './ConfirmDialog';
import OverlayLoading from './OverlayLoading';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  actions: {
    position: 'relative',
  },
  loadingSpinner: {
    width: `${theme.spacing.unit * 2}px !important`,
    height: `${theme.spacing.unit * 2}px !important`,
    paddingTop: theme.spacing.unit * 2,
  }
})

class LanguageRow extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: false, dialogOpen: false };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.editing === true && nextProps.editing === false && nextProps.editErrors === null){
      this.setState({ editing: false });
    }
  }

  render () {
    const {
      classes,
      language, 
      editing: submitting, 
      onEditSubmit,
      editErrors: errors,
      deleting,
      onDelete
    } = this.props;
    const { code, name } = language;

    if(this.state.editing) {
      return <LanguageRowForm
        initialValues={{ code, name }}
        onSubmit={onEditSubmit}
        errors={errors}
        inProgress={submitting}
        onCancel={() => this.setState({ editing: false })} />
    }

    return (
      <TableRow className={classes.root}>
        <TableCell>
          {code}
        </TableCell>
        <TableCell>
          {name}
        </TableCell>
        <TableCell className={classes.actions}>
          <IconButton onClick={() => this.setState({ editing: true })}>
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => this.setState({ dialogOpen: true })}>
            <DeleteIcon />
          </IconButton>
          {
            deleting &&
            <OverlayLoading classes={{ spinner: classes.loadingSpinner }} />
          }
        </TableCell>
        <ConfirmDialog 
          text="Are you sure you want to remove this langauge?" 
          open={this.state.dialogOpen}
          onConfirmClick={onDelete}
          onRequestClose={() => this.setState({ dialogOpen: false })} />
      </TableRow>
    );
  }
}

export default withStyles(styles)(LanguageRow);