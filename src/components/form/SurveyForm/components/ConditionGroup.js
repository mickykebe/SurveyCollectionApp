import React, { Component } from 'react';
import { Field } from 'redux-form';
import Button from 'material-ui/Button';
import MenuSelectField from 'components/form/controls/MenuSelectField';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    flexWrap: 'wrap',
  },
  operatorContainer: {
    flex: 1,
    marginRight: '16px'
  },
  conditionsContainer: {
    flex: 3,
  }
};

class ConditionGroup extends Component {
  render() {
    const { classes, logicalOperators } = this.props;
    const operatorOptions = logicalOperators.map(op => ({ label: op.text, val: op.code }));
    return (
      <div className={classes.root}>
        <div className={classes.operatorContainer}>
          <Field
            name="operator"
            component={renderMenuSelectField}
            options={operatorOptions}
            fullWidth={true}
            margin="normal"
            />
        </div>
        <div className={classes.conditionsContainer}>
          <Button dense color="accent"><AddIcon /></Button>
          <Button dense color="accent"><PlaylistAddIcon /></Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ConditionGroup);

