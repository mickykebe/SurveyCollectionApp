import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import logo from '../images/logo.png';

const stylesheet = createStyleSheet({
  formContainer: {
    padding: '30px'
  },
  logo: {
    display: "block",
    width: "65%",
    margin: "0 auto 20px",
  }
});

class AuthForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7} md={6} lg={5} xl={5}>
          <Paper className={classes.formContainer}>
            <img src={logo} className={classes.logo} alt="logo"/>
            {this.props.children}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(stylesheet)(AuthForm);