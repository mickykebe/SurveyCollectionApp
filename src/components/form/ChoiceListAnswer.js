import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ChoiceAnswer from './ChoiceAnswer';

const stylesheet = createStyleSheet(() => ({
  button: {
    margin: '0 auto',
    display: 'block',
  }
}));

class ChoiceListAnswer extends Component {
  render() {
    const { classes, fields, choiceType, activeLanguages } = this.props;

    return (
      <div>
        <Button
          raised
          dense
          color="accent"
          className={classes.button}
          onClick={() => fields.push({})}>
          Add Choice
          </Button>
          {
            fields.map((choice, index) =>
              <ChoiceAnswer
                key={choice}
                choice={choice}
                choiceType={choiceType}
                activeLanguages={activeLanguages}
                onRemove={() => fields.remove(index)} />)
          }
      </div>
    )
  }
}

export default withStyles(stylesheet)(ChoiceListAnswer);