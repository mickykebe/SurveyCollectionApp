import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AuthContainer from 'components/AuthContainer';
import mockData from 'mockData';
import { renderTextField, renderMultiChoiceField } from 'components/form/helper/fieldRenderers';
import QuestionListForm from './QuestionListForm';
import surveyFormValidator from './validator';
import { uuidv4 } from 'utils';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: '30px'
  },
  submitButton: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'block',
    marginTop: '10px',
  }
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
    const { classes, languages, values } = this.props;
    const langOptions = languages.map((lang) => ({val: lang.code, label: lang.name}));

    console.log(values);
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
            <Button raised color="accent" className={classes.submitButton} type="submit">Submit</Button>
          </form>
        </Paper>
      </AuthContainer>
    );
  }
}

export default compose(
  connect(mapStateToProps), 
  withStyles(stylesheet),
  reduxForm({
    form: 'surveyForm', 
    initialValues: { uuid: uuidv4(), languages: ['en'] },
    validate: surveyFormValidator,
  }),
)(SurveyForm);