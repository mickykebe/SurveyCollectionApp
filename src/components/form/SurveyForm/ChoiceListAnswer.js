import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import ChoiceAnswer from './ChoiceAnswer';
import { uuidv4 } from 'utils'

const styles = (theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  }
});

class ChoiceListAnswer extends Component {
  render() {
    const { classes, fields, choiceType, formLanguages, meta: { dirty, error } } = this.props;

    return (
      <div>
        <Button
          raised
          dense
          color="accent"
          className={classes.button}
          onClick={() => fields.push({uuid: uuidv4()})}>
          Add Choice
          </Button>
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