import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { renderMenuSelectField, renderTextField } from 'components/form/helper/fieldRenderers';

const styles = {
  root: {
    display: 'flex',
    flex: 3,
  },
  operator: {
    flex: 1,
  },
  value: {
    flex: 2,
  }
}

function ConditionRHS(props) {
  const { classes, operators, question } = props;
  const opOptions = operators.map(op => ({ label: op.text, val: op.code }));
  return (
    <div className={classes.root}>
      <Field
        name="operator"
        component={renderMenuSelectField}
        options={opOptions}
        label='Operator'
        className={classes.operator}
        />
      {
        (question.type === 'text' ||
        question.type === 'number' ||
        question.type === 'number-range') &&
        <Field
          name="value"
          component={renderTextField}
          label="value"
          required={true}
          className={classes.value}
          />
      }
    </div>
  );
}

export default withStyles(styles)(ConditionRHS);