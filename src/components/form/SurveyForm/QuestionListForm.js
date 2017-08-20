import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import QuestionForm from 'components/form/SurveyForm/QuestionForm';
import { FormHelperText } from 'material-ui/Form';
import { uuidv4 } from 'utils';

const styles = (theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
    marginTop: '10px',
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  }
});

class QuestionListForm extends Component {
  render() {
    const { classes, fields, meta: { dirty, error } } = this.props;
    
    return (
      <div>
        <Button 
          raised 
          className={classes.button} 
          color="accent" 
          onClick={() => fields.push({type: 'text', condition: { operator: '&&' }, uuid: uuidv4()})}>
          Add Question
        </Button>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        {
          fields.map((qName, index, fields) => 
            <Field
              key={qName}
              component={QuestionForm}
              name={qName}
              index={index}
              onRemove={() => fields.remove(index)}
              />)
        }
      </div>
    )
  }
}

export default withStyles(styles)(QuestionListForm);