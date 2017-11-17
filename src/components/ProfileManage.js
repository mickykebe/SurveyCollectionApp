import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import LockIcon from 'material-ui-icons/LockOpen';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import PersonIcon from 'material-ui-icons/Person';

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing.unit * 4,
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  sectionIcon: {
    verticalAlign: 'top',
    width: '28px',
    height: '28px',
  },
  grow: {
    flex: 1
  },
  header: {
    flex: 1,
    display: 'flex',
    paddingBottom: theme.spacing.unit * 4,
  },
  headline: {
    display: 'inline-block',
  },
  activationButton: {
    flexBasis: '200px',
    padding: 0,
  }
});

class ProfileManage extends Component {
  render() {
    const { classes, profile } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.section}>
          <CardContent>
            <div className={classes.header}>
              <Typography type="headline" color="secondary" className={classes.headline}>
                <PersonIcon className={`${classes.icon} ${classes.sectionIcon}`} /> User Information
              </Typography>
              <div className={classes.grow} />
              {
                !profile.active &&
                <Button color="accent" dense raised className={classes.activationButton}>
                  <PersonAddIcon className={classes.icon} />Activate User
                </Button>
              }
              {
                profile.active &&
                <Button color="accent" dense className={classes.activationButton}>
                  <PersonOutlineIcon className={classes.icon} />Deactivate User
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
        {/*<Card className={classes.section}>
          <CardContent>
            <Typography type="headline" color="secondary" className={classes.header}>
              <LockIcon className={classes.sectionIcon} /> Permissions
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.grow} />
            <Button color="accent" dense raised>Save</Button>
          </CardActions>
        </Card>*/}
      </div>
    )
  }
}

export default withStyles(styles)(ProfileManage);