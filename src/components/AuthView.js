import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import logo from '../images/logo.png';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
  formContainer: {
    padding: '32px'
  },
  logo: {
    display: "block",
    width: "65%",
    margin: "0 auto 20px",
  }
};

class AuthView extends Component {
  render() {
    const { classes, isAuthenticating } = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7} md={5}>
          <Paper>
            { 
              isAuthenticating && 
              <LinearProgress color="accent" />
            }
            <div className={classes.formContainer}>
              <img src={logo} className={classes.logo} alt="logo"/>
              {this.props.children}
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AuthView);
