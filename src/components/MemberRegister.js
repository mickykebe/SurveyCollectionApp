import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CompanyIcon from 'material-ui-icons/AccountBalance';
import PersonIcon from 'material-ui-icons/Person';
import FormSection from './FormSection';
import PopupSnackbar from './PopupSnackbar';

const styles = theme => ({
  button: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  selectControl: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  error: {
    color: 'red',
    paddingTop: theme.spacing.unit * 2,
  }
});

class MemberRegister extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    company: '',
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.props.isAuthenticating)
      return;
    const user = {
      company: this.state.company,
      user: {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
      },
    };
    this.props.onSubmit(user);
  }

  onFieldChange = (fieldKey, e) => {
    this.setState({
      [fieldKey]: e.target.value,
    });
  }

  render() {
    const { isAuthenticating, classes, errors, companies } = this.props;
    const { 
      user: { 
        username:usernameError = false,
        first_name:firstnameError = false,
        last_name:lastnameError = false,
        email:emailError = false,
        password:passwordError = false,
        confirm_password:confirmPassError = false,
      } = {
        usernameError: false,
        firstnameError: false,
        lastnameError: false,
        emailError: false,
        passwordError: false,
        confirmPassError: false,
        companyError: false,
      },
      company: companyError = false,
      non_field_errors: nonFieldErrors = false,
      network_error:networkError = false,
    } = errors || {};

    return (
      <form onSubmit={this.onSubmitForm}>
        {
          !!nonFieldErrors &&
          <Typography type="body1" align="center" className={classes.error}>
            {nonFieldErrors}
          </Typography>
        }
        <FormSection
          iconComponent={CompanyIcon}
          title="Company">
          <FormControl error={!!companyError} className={classes.selectControl}>
            <InputLabel htmlFor="company-select">Company</InputLabel>
            <Select
              input={<Input id="company-select" />}
              fullWidth={true}
              inputProps={{required: true}}
              margin="normal"
              onChange={(e) => this.onFieldChange('company', e)}
              value={this.state.company}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                companies.map(({uuid, name}) => <MenuItem value={uuid}>{name}</MenuItem>)
              }
            </Select>
            <FormHelperText>{companyError}</FormHelperText>
          </FormControl>
        </FormSection>
        <FormSection
          iconComponent={PersonIcon}
          title="User">
          <TextField
            required={true}
            placeholder='Username'
            label='Username'
            fullWidth={true}
            inputProps={{required: 'true'}}
            margin='normal'
            onChange={(e) => this.onFieldChange('username', e)}
            value={this.state.username}
            error={!!usernameError}
            helperText={usernameError} />
          <TextField
            required={true}
            placeholder='First Name'
            label='First Name'
            fullWidth={true}
            margin='normal'
            onChange={(e) => this.onFieldChange('first_name', e)}
            value={this.state.first_name}
            error={!!firstnameError}
            helperText={firstnameError} />
          <TextField
            required={true}
            placeholder='Last Name'
            label='Last Name'
            fullWidth={true}
            margin='normal'
            onChange={(e) => this.onFieldChange('last_name', e)}
            value={this.state.last_name}
            error={!!lastnameError}
            helperText={lastnameError} />
          <TextField
            required={true}
            placeholder='Email'
            label='Email'
            fullWidth={true}
            type='email'
            inputProps={{required: 'true'}}
            margin='normal'
            onChange={(e) => this.onFieldChange('email', e)}
            value={this.state.email}
            error={!!emailError}
            helperText={emailError} />
          <TextField
            required={true}
            placeholder='Password'
            label='Password'
            fullWidth={true}
            type='password'
            inputProps={{required: 'true'}}
            margin='normal'
            onChange={(e) => this.onFieldChange('password', e)}
            value={this.state.password}
            error={!!passwordError}
            helperText={passwordError} />
          <TextField
            required={true}
            placeholder='Confirm Password'
            label='Confirm Password'
            fullWidth={true}
            type='password'
            inputProps={{required: 'true'}}
            margin='normal'
            onChange={(e) => this.onFieldChange('confirm_password', e)}
            value={this.state.confirm_password}
            error={!!confirmPassError}
            helperText={confirmPassError} />
          <Button disabled={isAuthenticating} raised className={classes.button} type="submit" color="accent">Register</Button>
        </FormSection>
        <PopupSnackbar
          show={!!networkError}
          message={networkError} />
      </form>
    );
  }
}

export default withStyles(styles)(MemberRegister);