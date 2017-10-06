import React from 'react';
import { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import ConditionGroupContainer from '../containers/ConditionGroupContainer';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  overflow: {
    overflow: 'visible',
  }
});

function ConditionCollapse({ classes, controllingQuestions, expanded }) {
  return (
    <Collapse className={classes.overflow} in={expanded} transitionDuration="auto" unmountOnExit>
      <CardContent>
        <ConditionGroupContainer
          controllingQuestions={controllingQuestions} />
      </CardContent>
    </Collapse>
  )
}

export default withStyles(styles)(ConditionCollapse);