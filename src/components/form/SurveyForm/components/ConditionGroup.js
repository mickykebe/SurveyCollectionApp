import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import ConditionList from './ConditionList';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { FormHelperText } from 'material-ui/Form';

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

function ConditionGroup({ classes, condition, logicalOperators, allQuestions, currentQuestion, onRemove}) {
  const operatorOptions = logicalOperators.map(op => ({ label: op.text, val: op.code }));
  if(allQuestions.length < 2) {
    return (<FormHelperText error className={classes.err}>A minimum of two question required</FormHelperText>);
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
          allQuestions={allQuestions}
          currentQuestion={currentQuestion}
          logicalOperators={logicalOperators} />
      </div>
      {
        condition &&
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      }
    </div>
  );
}

function Wrapper(props) {
  if(!props.condition)
    return <ConditionGroup {...props} />;
  return (
    <FormSection name={props.condition}>
      <ConditionGroup {...props} />
    </FormSection>
  );
}

export default withStyles(styles)(Wrapper);

