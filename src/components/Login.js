import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AuthView from './AuthView';
import api from '../api';
import {
  LOGIN,
  LOGIN_UNLOAD
} from '../actionTypes';

const stylesheet = createStyleSheet({
  button: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'block',
    marginTop: '10px',
  },
});

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => {
    const payload = api.Auth.login(username, password);
    dispatch({ type: LOGIN, payload });
  },
  onUnload: () =>
    dispatch({ type: LOGIN_UNLOAD })
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onFieldChange(fieldKey, e) {
    this.setState({
      [fieldKey]: e.target.value,
    });
  }

  onSubmitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  }

  render() {
    const { classes, errors } = this.props;
    const {
      username:usernameError = false,
      password:passwordError = false,
      non_field_errors:nonFieldErrors = false
    } = errors || {};

    return (
      <AuthView>
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
            error={!!usernameError || !!nonFieldErrors}
            helperText={usernameError || nonFieldErrors} />
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
          <Button raised className={classes.button} color="accent" type="submit">Login</Button>
        </form>
      </AuthView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(stylesheet)(Login));