import React, { Component } from 'react';
import { Field } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { FormLabel } from 'material-ui/Form';
import { renderTextField } from './fieldRenderers';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'right',
    paddingRight: '16px',
  },
  fieldsContainer: {
    flex: 5
  }
}));

class QuestionTitle extends Component{
  render() {
    const { classes, question, activeLanguages } = this.props;
    return (
      <div className={classes.root}>
        <FormLabel className={classes.label}>
          Title
        </FormLabel>
        <div className={classes.fieldsContainer}>
          {
            activeLanguages.map((ln) => 
              <Field
                key={ln.key}
                label={`(${ln.name})`}
                name={`${question}.title.${ln.key}`}
                component={renderTextField}
                fullWidth={true}
                margin="normal"
                />
            )
          }
        </div>
      </div>
    )
  }

}

export default withStyles(stylesheet)(QuestionTitle);