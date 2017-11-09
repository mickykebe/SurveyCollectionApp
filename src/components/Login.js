import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PopupSnackbar from './PopupSnackbar';
import { login } from '../actions';
import api from '../api';
import { getIsAuthenticating, getLoginErrors } from '../reducers';
import logo from '../images/logo.png';

const styles = theme => ({
  root: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  content: {
    padding: theme.spacing.unit * 4,
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  logo: {
    display: 'block',
    width: '75%',
    margin: `${theme.spacing.unit * 2}px auto`,
  },
  error: {
    color: 'red',
    paddingTop: theme.spacing.unit * 2,
  }
});

const mapStateToProps = (state) => ({
  isAuthenticating: getIsAuthenticating(state),
  errors: getLoginErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => {
    dispatch(login(api.Auth.login(username, password)));
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(fieldKey, e) {
    this.setState({
      [fieldKey]: e.target.value,
    });
  }

  onSubmitForm(e) {
    e.preventDefault();
    if(this.props.isAuthenticating) {
      return;
    }
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  }

  render() {
    const { isAuthenticating, classes, errors } = this.props;

    const {
      username:usernameError = false,
      password:passwordError = false,
      non_field_errors:nonFieldErrors = false,
      network_error:networkError = false,
    } = errors || {};

    return (
      <Paper className={classes.root}>
        { isAuthenticating && 
          <LinearProgress color="accent" />
        }
        <div className={classes.content}>
          <img src={logo} className={classes.logo} alt="logo"/>
          <form onSubmit={this.onSubmitForm}>
            {
              !!nonFieldErrors &&
              <Typography type="body1" align="center" className={classes.error}>
                {nonFieldErrors}
              </Typography>
            }
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
            <Button
              disabled={isAuthenticating}
              raised
              className={classes.button}
              color="accent"
              type="submit">Login</Button>
          </form>
        </div>
        <PopupSnackbar
          show={!!networkError}
          message={networkError} />
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));