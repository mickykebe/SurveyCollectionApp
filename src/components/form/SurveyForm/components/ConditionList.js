import React from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import ConditionGroup from './ConditionGroup';
import Condition from './Condition';
import FormToolbar from './FormToolbar';

const styles = {
  actions: {
    display: 'flex',
  },
  flexGrow: {
    flex: '1 1 auto'
  },
  conditions: {
    marginTop: '16px',
  }
}

function ConditionList({ classes, fields, ...rest }) {
  return (
    <div>
      <FormToolbar
        title="Conditions"
        onAddField={() => fields.push({ type: 'relational', operator: '==' })}
        onAddForm={() => fields.push({ type: 'logical', operator: '&&' })} />
      <div className={classes.conditions}>
        {
          fields.map((condition, index) => {
            const type = fields.get(index).type || 'relational';
            return (
              <FormSection
                key={condition}
                name={condition}>
                <Field
                  key={condition}
                  name={condition}
                  component={ type === 'logical' ? ConditionGroup : Condition }
                  onRemove={() => fields.remove(index)}
                  {...rest} />
              </FormSection>);
          })
        }
      </div>
    </div>
  );
}

export default withStyles(styles)(ConditionList);