import React from 'react';
import { FormSection } from 'redux-form';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { withStyles } from 'material-ui/styles';
import ConditionGroup from './ConditionGroup';
import ConditionContainer from '../containers/ConditionContainer';

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
      <AppBar position="static" color="default" elevation="1">
        <Toolbar>
          <Typography type="subheading" color="inherit">
            Conditions
          </Typography>
          <div className={classes.flexGrow} />
          <Tooltip title="Add Condition" placement="top">
            <IconButton dense onClick={() => fields.push({ type: 'relational', operator: '==' })}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Logical condition group" placement="top">
            <IconButton dense onClick={() => fields.push({ type: 'logical', operator: '&&' })}>
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={classes.conditions}>
        {
          fields.map((condition, index) => {
            const type = fields.get(index).type || 'relational';
            return (
              <FormSection
                key={condition}
                name={condition}>
                {
                  type === 'relational' &&
                  <ConditionContainer
                    onRemove={() => fields.remove(index)}
                    {...rest}
                    />
                }
                {
                  type === 'logical' &&
                  <ConditionGroup
                    onRemove={() => fields.remove(index)}
                    {...rest}
                    />
                }
              </FormSection>);
          })
        }
      </div>
    </div>
  );
}

export default withStyles(styles)(ConditionList);