import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import QuestionForm from './QuestionForm';
import { FormHelperText } from 'material-ui/Form';
import { uuidv4 } from './helper/utils';

const stylesheet = createStyleSheet((theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
    marginTop: '10px',
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  }
}));

class QuestionListForm extends Component {
  render() {
    const { classes, fields, meta: { dirty, error } } = this.props;

    return (
      <div>
        <Button 
          raised 
          className={classes.button} 
          color="accent" 
          onClick={() => fields.push({type: 'text', uuid: uuidv4()})}>
          Add Question
        </Button>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        {
          fields.map((question, index) => 
            <QuestionForm 
              key={index} 
              question={question} 
              index={index}
              onRemove={() => fields.remove(index)} />)
        }
      </div>
    )
  }
}

export default withStyles(stylesheet)(QuestionListForm);