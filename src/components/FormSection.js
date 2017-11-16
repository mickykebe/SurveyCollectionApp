import React from 'react';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit}px`,
  },
  headerIcon: {
    verticalAlign: 'top',
    marginRight: 4
  },
  headerTitle: {
    paddingBottom: 4,
  }
});

function FormSection({ classes, iconComponent: Icon, title, children }) {
  return (
    <div className={classes.root}>
      <div>
        <Typography type="title" color="secondary" className={classes.headerTitle}>
          { !!Icon &&
            <Icon className={classes.headerIcon} />
          }
          {title}
        </Typography>
        <Divider />
      </div>
      {children}
    </div>
  );
}

export default withStyles(styles)(FormSection);