import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import AuthViewContainer from '../containers/AuthViewContainer';
import { register } from '../actions';
import api from '../api';
import { getIsAuthenticating, getAuthErrors } from '../reducers';

const styles = {
  button: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'block',
    marginTop: '10px',
  },
};

const mapStateToProps = (state) => ({
  isAuthenticating: getIsAuthenticating(state),
  errors: getAuthErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, first_name, last_name, email, password, confirm_password) => {
    dispatch(register(
      api.Auth.register(username, first_name, last_name, email, password, confirm_password),
    ));
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onSubmitForm(e) {
    e.preventDefault();
    if(this.props.isAuthenticating)
      return;
    const { 
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = this.state;
    this.props.onSubmit(username, first_name, last_name, email, password, confirm_password);
  }

  onFieldChange(fieldKey, e) {
    this.setState({
      [fieldKey]: e.target.value,
    });
  }

  render() {
    const { classes, errors } = this.props;
    const { 
      user: { 
        username:usernameError = false,
        first_name:firstnameError = false,
        last_name:lastnameError = false,
        email:emailError = false,
        password:passwordError = false,
        confirm_password:confirmPassError = false
      } = {
        usernameError: false,
        firstnameError: false,
        lastnameError: false,
        emailError: false,
        passwordError: false,
        confirmPassError: false
      }
    } = errors || {};


    return (
      <AuthViewContainer>
        <form onSubmit={this.onSubmitForm}>
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
          <Button raised className={classes.button} type="submit" color="accent">Register</Button>
        </form>
      </AuthViewContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));