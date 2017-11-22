import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import PersonIcon from 'material-ui-icons/Person';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
  header: {
    flex: 1,
    display: 'flex',
    paddingBottom: theme.spacing.unit * 4,
  },
  grow: {
    flex: 1
  },
  activationButton: {
    flexBasis: '200px',
    padding: 0,
  },
  buttonIcon: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
  sectionIcon: {
    verticalAlign: 'top',
    width: '29px',
    height: '29px',
  },
});

class ProfileManageUser extends Component {
  render() {
    const { 
      classes, 
      activationInProgress, 
      profile,
      onActivate,
      onDeactivate 
    } = this.props;

    return (
      <Card className={classes.root}>
        {
          activationInProgress &&
          <LinearProgress color="accent" />
        }
        <CardContent>
          <div className={classes.header}>
            <Typography type="headline" color="secondary">
              <PersonIcon className={classes.sectionIcon} /> User Information
            </Typography>
            <div className={classes.grow} />
            {
              !profile.active &&
              <Button 
                color="accent"
                dense raised
                className={classes.activationButton}
                onClick={onActivate}
                disabled={activationInProgress}>
                <PersonAddIcon className={classes.buttonIcon} />Activate User
              </Button>
            }
            {
              profile.active &&
              <Button
                color="accent"
                dense
                className={classes.activationButton}
                onClick={onDeactivate}
                disabled={activationInProgress}>
                <PersonOutlineIcon className={classes.buttonIcon} />Deactivate User
              </Button>
            }
          </div>
          <Grid container justify="center">
            <Grid item xs={12} md={5}>
              <TextField
                label="Username"
                value={profile.user.username}
                fullWidth={true}
                disabled={true} />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="First Name"
                value={profile.user.first_name}
                fullWidth={true}
                disabled={true} />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="LastName"
                value={profile.user.last_name}
                fullWidth={true}
                disabled={true} />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Email"
                value={profile.user.email}
                fullWidth={true}
                disabled={true} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfileManageUser);