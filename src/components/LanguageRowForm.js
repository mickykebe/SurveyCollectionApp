import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { TableCell, TableRow } from 'material-ui/Table';
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
    padding: `0 ${theme.spacing.unit*3}px ${theme.spacing.unit}px`,
  },
  actionCell: {
    paddingTop: theme.spacing.unit
  },
  cancelBtn: {
    marginLeft: theme.spacing.unit,
  }
})

class LanguageRowForm extends Component {
  constructor(props) {
    super(props);
    const { code = '', name = '' } = this.props.initialValues || {};

    this.state = { code, name };
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
    const { id: formId = "langForm", classes, errors, inProgress, onCancel, submitLabel = 'Submit' } = this.props;
    const { 
      code: codeError = false,
      name: nameError = false,
    } = errors || {};
    return (
      <TableRow>
        <TableCell className={classes.fieldCell}>
          <form id={formId} onSubmit={this.onSubmit}>
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
          </form>
        </TableCell>
        <TableCell className={classes.fieldCell}>
          <TextField
            label="Name"
            required={true}
            fullWidth={true}
            inputProps={{required: 'true', form: formId}}
            onChange={this.handleFieldChange('name')}
            value={this.fieldValue('name')}
            error={!!nameError}
            helperText={nameError} />
        </TableCell>
        <TableCell className={classes.actionCell}>
          <Button 
            dense 
            raised 
            color="accent"
            type="submit"
            disabled={inProgress}
            form={formId}>{submitLabel}</Button>
          {
            !!onCancel &&
            <Button
              className={classes.cancelBtn}
              dense
              raised
              color="accent"
              disabled={inProgress}
              onClick={onCancel}>Cancel</Button>
          }
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(LanguageRowForm);