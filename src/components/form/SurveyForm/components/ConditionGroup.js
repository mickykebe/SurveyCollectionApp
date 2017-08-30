import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import ConditionList from './ConditionList';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    flexWrap: 'wrap',
  },
  operatorContainer: {
    marginRight: '16px'
  },
  conditionsContainer: {
    flex: 3,
  },
  err: {
    textAlign: 'center',
  }
};

function ConditionGroup({ classes, logicalOperators, controllingQuestions, onRemove}) {
  const operatorOptions = logicalOperators.map(op => ({ label: op.text, val: op.code }));
  if(!controllingQuestions.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.operatorContainer}>
        <Field
          name="operator"
          component={renderMenuSelectField}
          label="Operator"
          options={operatorOptions}
          fullWidth={true}
          margin="normal"
          rightAlign={true}
          />
      </div>
      <div className={classes.conditionsContainer}>
        <FieldArray
          name='conditions'
          component={ConditionList}
          controllingQuestions={controllingQuestions}
          logicalOperators={logicalOperators} />
      </div>
      {
        !!onRemove &&
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      }
    </div>
  );
}

export default withStyles(styles)(ConditionGroup);

