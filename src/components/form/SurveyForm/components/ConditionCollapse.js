import React from 'react';
import { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import ConditionGroupContainer from '../containers/ConditionGroupContainer';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  overflow: {
    overflow: 'visible',
  }
});

function ConditionCollapse({ classes, controllingQuestions, expanded }) {
  return (
    <Collapse in={expanded} transitionDuration="auto" unmountOnExit>
      <CardContent>
        <ConditionGroupContainer
          controllingQuestions={controllingQuestions} />
      </CardContent>
      <Divider />
    </Collapse>
  )
}

export default withStyles(styles)(ConditionCollapse);