import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, FormSection, formValueSelector } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { getAllLanguages, getLanguagesFromCodes } from 'reducers';
import { surveyFormName } from 'constantValues';
import { renderTextField, renderMultiChoiceField } from 'components/form/helper/fieldRenderers';
import QuestionListForm from './QuestionListForm';
import LangTextField from './LangTextField';
import surveyFormValidator from './validator';
import { uuidv4 } from 'utils';
import { surveyCreate } from '../../../actions';
import { withRouter } from 'react-router';
import PopupSnackbar from 'components/PopupSnackbar';
import { getSurveyCreateErrors } from 'reducers';

const styles = {
  root: {
    padding: '30px'
  },
  submitButton: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'block',
    marginTop: '10px',
  }
};
  
const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state) => {
  const langCodes = formSelector(state, 'languages') || [];
  const formLanguages = getLanguagesFromCodes(undefined, langCodes);

  return {
    allLanguages: getAllLanguages(),
    formLanguages,
    errors: getSurveyCreateErrors(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createSurvey: (survey) => dispatch(surveyCreate(survey)),
})

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { activeLanguages: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log('In on submit');
    this.props.createSurvey(values, () => this.props.history.push('/'));
  }

  render() {
    const { classes, allLanguages, formLanguages, handleSubmit, errors } = this.props;
    const langOptions = allLanguages.map((lang) => ({val: lang.code, label: lang.name}));

    const { message = false } = errors || {};

    return (
        <div className={classes.root}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <FormSection name="title">
              <LangTextField
                label="Title"
                languages={formLanguages} />
            </FormSection>
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
          <PopupSnackbar
            show={!!message}
            message={message} />
        </div>
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps), 
  withStyles(styles),
  reduxForm({
    form: surveyFormName, 
    initialValues: { uuid: uuidv4(), languages: ['en'] },
    validate: surveyFormValidator,
  }),
)(SurveyForm);