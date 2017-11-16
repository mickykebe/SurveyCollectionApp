import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import LockIcon from 'material-ui-icons/LockOpen';
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
  sectionIcon: {
    verticalAlign: 'top',
    width: '28px',
    height: '28px',
  },
  grow: {
    flex: 1
  },
  header: {
    paddingBottom: theme.spacing.unit * 4,
  }
});

class ProfileManage extends Component {
  render() {
    const { classes, profile } = this.props;

    return (
      <div className={classes.root}>

        <Card className={classes.section}>
          <CardContent>
            <Typography type="headline" color="secondary" className={classes.header}>
              <PersonIcon className={classes.sectionIcon} /> User Information
            </Typography>
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