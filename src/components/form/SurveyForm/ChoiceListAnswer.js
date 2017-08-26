import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import IconButton from 'material-ui/IconButton';
import ChoiceAnswer from './ChoiceAnswer';
import { uuidv4 } from 'utils';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
  },
  flexGrow: {
    flex: '1 1 auto'
  }
});

class ChoiceListAnswer extends Component {
  render() {
    const { classes, fields, choiceType, formLanguages, meta: { dirty, error } } = this.props;

    return (
      <div>
        <div className={classes.actions}>
          <div className={classes.flexGrow} />
          <IconButton onClick={() => fields.push({uuid: uuidv4()})}><AddIcon /></IconButton>
          <IconButton><PlaylistAddIcon /></IconButton>
        </div>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        {
          fields.map((choice, index) =>
            <ChoiceAnswer
              key={choice}
              choice={choice}
              choiceType={choiceType}
              formLanguages={formLanguages}
              onRemove={() => fields.remove(index)} />)
        }
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceListAnswer);