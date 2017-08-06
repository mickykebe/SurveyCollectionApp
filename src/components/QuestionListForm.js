import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { renderTextField } from './form/fieldRenderers';
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
    const { classes, languages, fields, meta: { error } } = this.props;

    return (
      <div>
        <Button 
          raised 
          className={classes.button} 
          color="accent" 
          onClick={() => fields.push()}>
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