import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AuthContainer from './AuthContainer';
import mockData from '../mockData';
import Button from 'material-ui/Button';
import { renderTextField, renderMultiChoiceField } from './form/fieldRenderers';
import MultiChoiceField from './form/MultiChoiceField';
import QuestionListForm from './QuestionListForm';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: '30px'
  },
}));
  

const mapStateToProps = (state) => {
  const languages = Object.keys(mockData.languages).map((key) => mockData.languages[key]);

  return {
    languages: languages,
  };
};

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { activeLanguages: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { classes, languages } = this.props;
    const langOptions = languages.map((lang) => ({val: lang.key, label: lang.name}));

    return (
      <AuthContainer>
        <Paper className={classes.root}>
          <form onSubmit={this.onSubmit}>
            <Field
              name='title'
              component={renderTextField}
              label='Title'
              required={true}
              fullWidth={true}
              margin="normal" />
            <Field
              name='description'
              component={renderTextField}
              label='Description'
              fullWidth={true}
              margin="normal" />
            <Field
              name="languages"
              component={renderMultiChoiceField}
              label="Languages"
              options={langOptions} />
            <FieldArray 
              name="questions"
              component={QuestionListForm}
               />
          </form>
        </Paper>
      </AuthContainer>
    );
  }
}

export default compose(
  connect(mapStateToProps), 
  withStyles(stylesheet),
  reduxForm({form: 'surveyForm'}),
)(SurveyForm);