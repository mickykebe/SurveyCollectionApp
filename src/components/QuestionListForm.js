import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import QuestionForm from './QuestionForm';

const stylesheet = createStyleSheet((theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
    marginTop: '10px',
  },
}));

class QuestionListForm extends Component {
  render() {
    const { classes, fields } = this.props;

    return (
      <div>
        <Button 
          raised 
          className={classes.button} 
          color="accent" 
          onClick={() => fields.push({type: 'text'})}>
          Add Question
        </Button>
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