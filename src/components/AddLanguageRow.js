import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { TableRow, TableCell } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'table-row',
    height: theme.spacing.unit * 6,
    verticalAlign: 'inherit',
    borderColor: 'inherit',
  },
  fieldCell: {
    padding: `0 ${theme.spacing.unit*3}px`,
  },
  actionCell: {
    paddingTop: theme.spacing.unit
  }
})

class AddLanguageRow extends Component {
  constructor(props) {
    super(props);

    this.state = { code: '', name: ''};
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.fieldValue = this.fieldValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      code: '',
      name: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.inProgress === true && nextProps.inProgress === false && nextProps.errors === null) {
      this.resetForm();
    }
  }

  handleFieldChange(key) {
    return (e) => {
      this.setState({
        [key]: e.target.value,
      });
    }
  }

  fieldValue(key) {
    return this.state[key];
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ code: this.state.code, name: this.state.name });
  }

  render() {
    const { classes, errors, inProgress } = this.props;
    const { 
      code: codeError = false,
      name: nameError = false,
    } = errors || {};
    return (
      <form className={classes.root} onSubmit={this.onSubmit}>
        <TableCell className={classes.fieldCell}>
          <TextField
            label="Code"
            required={true}
            fullWidth={true}
            inputProps={{required: 'true'}}
            onChange={this.handleFieldChange('code')}
            value={this.fieldValue('code')}
            error={!!codeError}
            helperText={codeError}
            />
        </TableCell>
        <TableCell className={classes.fieldCell}>
          <TextField
            label="Name"
            required={true}
            fullWidth={true}
            inputProps={{required: 'true'}}
            onChange={this.handleFieldChange('name')}
            value={this.fieldValue('name')}
            error={!!codeError}
            helperText={codeError} />
        </TableCell>
        <TableCell className={classes.actionCell}>
          <Button 
            dense 
            raised 
            color="accent"
            type="submit"
            disabled={inProgress}>Add</Button>
        </TableCell>
      </form>
    );
  }
}

export default withStyles(styles)(AddLanguageRow);