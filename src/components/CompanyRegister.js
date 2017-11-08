import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import CompanyIcon from 'material-ui-icons/AccountBalance';
import PersonIcon from 'material-ui-icons/Person';
import FormSection from './FormSection';
import _get from 'lodash/get';

const styles = theme => ({
  button: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  section: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  header: {
    paddingBottom: theme.spacing.unit * 2,
  },
  headerIcon: {
    verticalAlign: 'top',
    marginRight: 4
  },
  headerTitle: {
    paddingBottom: 4,
  }
});

class CompanyRegister extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    company_name: '',
  }

  onFieldChange = (fieldKey, e) => {
    this.setState({
      [fieldKey]: e.target.value,
    });
  }

  render() {
    const { isAuthenticating, classes, errors } = this.props;
    const usernameError = _get(errors, 'admin.user.username', false);
    const firstnameError = _get(errors, 'admin.user.first_name', false);
    const lastnameError = _get(errors, 'admin.user.last_name', false);
    const emailError = _get(errors, 'admin.user.email', false);
    const passwordError = _get(errors, 'admin.user.password', false);
    const confirmPassError = _get(errors, 'admin.user.confirm_password', false);
    const companyNameError = (errors && errors.name) || false;

    return (
      <form>
        <FormSection
          Icon={CompanyIcon}
          title="Company">
          <TextField
            required={true}
            placeholder="Name"
            label="Name"
            fullWidth={true}
            inputProps={{required: 'true'}}
            margin='normal'
            onChange={(e) => this.onFieldChange('company_name', e)}
            value={this.state.company_name}
            error={!!companyNameError}
            helperText={companyNameError} />
        </FormSection>
        <FormSection
          Icon={PersonIcon}
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
            placeholder='First Name'
            label='First Name'
            fullWidth={true}
            margin='normal'
            onChange={(e) => this.onFieldChange('first_name', e)}
            value={this.state.first_name}
            error={!!firstnameError}
            helperText={firstnameError} />
          <TextField
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
      </form>
    );
  }
}

export default withStyles(styles)(CompanyRegister);