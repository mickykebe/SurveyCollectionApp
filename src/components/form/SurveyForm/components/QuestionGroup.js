import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';

const styles = (theme) => ({
  root: {
    margin: '16px',
  },
  actionButton: {
    margin: theme.spacing.unit,
  },
  titleLabel: {
    flex: 3,
  },
  flexGrow: {
    flex: '1 1 auto',
  }
})

function QuestionGroup({ classes, root }) {
  return (
    <Card className={classes.root}>
    </Card>
  );
}

export default withStyles(styles)(QuestionGroup);