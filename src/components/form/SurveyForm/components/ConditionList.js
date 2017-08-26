import React from 'react';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import ConditionGroup from 'components/form/SurveyForm/components/ConditionGroup';
import Condition from 'components/form/SurveyForm/components/Condition';

const styles = {
  actions: {
    display: 'flex',
  },
  flexGrow: {
    flex: '1 1 auto'
  }
}

function ConditionList({ classes, fields, ...rest }) {
  return (
    <div>
      <div className={classes.actions}>
        <div className={classes.flexGrow} />
        <IconButton onClick={() => fields.push({ type: 'relational', operator: '==' })}><AddIcon /></IconButton>
        <IconButton onClick={() => fields.push({ type: 'logical', operator: '&&' })}><PlaylistAddIcon /></IconButton>
      </div>
      <div>
        {
          fields.map((condition, index) => {
            const type = fields.get(index).type || 'relational';
            return <Field
              key={condition}
              name={condition}
              condition={condition}
              component={ type === 'logical' ? ConditionGroup : Condition }
              onRemove={() => fields.remove(index)}
              {...rest} />
          })
        }
      </div>
    </div>
  );
}

export default withStyles(styles)(ConditionList);