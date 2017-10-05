import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import { renderMenuSelectField, renderTextField, renderMultiSelectField } from 'components/form/helper/fieldRenderers';
import { valFromLangObj } from 'utils';

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

class ConditionRHS extends Component {
  constructor(props) {
    super(props);

    this.onConditionValueChange = this.onConditionValueChange.bind(this);
  }

  onConditionValueChange(e, val) {
    if(this.props.onConditionValueChange) {
      this.props.onConditionValueChange(val);
    }
  }

  render() {
    const { classes, operators, question } = this.props;
    const opOptions = operators.map(op => ({ label: op.text, val: op.code }));
    let valOptions = [];
    if(question.choices) {
      valOptions = question.choices.map((choice, index) => ({ 
        label: (choice.text && valFromLangObj(choice.text)) || `Choice #${index+1}`,
        val: choice.uuid,
      }));
    }
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
          question.type === 'text' &&
          <Field
            name="value"
            component={renderTextField}
            label="value"
            required={true}
            className={classes.value}
            onChange={this.onConditionValueChange}
            />
        }
        {
          (
            question.type === 'number' ||
            question.type === 'number-range'
          ) &&
          <Field
            name="value"
            component={renderTextField}
            label="value"
            required={true}
            className={classes.value}
            inputProps={{ type: 'number' }}
            parse={value => Number(value)}
            onChange={this.onConditionValueChange}
            />
        }
        {
          question.type === 'choose-one' &&
          !!valOptions.length &&
          <Field
            name="value"
            component={renderMenuSelectField}
            label="Value"
            options={valOptions}
            className={classes.value}
            onChange={this.onConditionValueChange}
            />
        }
        {
          question.type === 'choose-any' &&
          !!valOptions.length &&
          <Field
            name="value"
            component={renderMultiSelectField}
            data={valOptions}
            valueField='val'
            textField='label'
            className={classes.value}
            onChange={this.onConditionValueChange}
            />
        }
      </div>
    );
  }
}

export default withStyles(styles)(ConditionRHS);