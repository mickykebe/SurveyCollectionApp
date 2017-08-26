import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, FormSection, formValueSelector } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { getAllLanguages, getLanguagesFromCodes } from 'reducers';
import { surveyFormName } from 'constantValues';
import { renderMultiChoiceField } from 'components/form/helper/fieldRenderers';
import QuestionListForm from './QuestionListForm';
import LangTextField from './LangTextField';
import surveyFormValidator from './validator';
import { uuidv4 } from 'utils';
import { surveyCreate } from '../../../actions';
import { withRouter } from 'react-router';
import api from '../../../api';
import { getSurveyCreateErrors, getIsCreatingSurvey } from 'reducers';
import { showPopup } from '../../../actions';

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
  const formLanguages = getLanguagesFromCodes(state, langCodes);

  return {
    allLanguages: getAllLanguages(state),
    formLanguages,
    errors: getSurveyCreateErrors(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createSurvey: (survey) => dispatch(surveyCreate(api.Surveys.create(survey), getIsCreatingSurvey)),
  displayPopup: (message) => dispatch(showPopup(message)),
})

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { activeLanguages: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.createSurvey(values).then(() => {
      this.props.displayPopup('Survey created successfully');
      this.props.history.push('/')
    });
  }

  render() {
    const { classes, allLanguages, formLanguages, handleSubmit } = this.props;
    const langOptions = allLanguages.map((lang) => ({val: lang.code, label: lang.name}));

    return (
        <div className={classes.root}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <FormSection name="title">
              <Field
                name="title"
                component={LangTextField}
                required={true}
                label="Title"
                languages={formLanguages}
                 />
            </FormSection>
            <FormSection name="description">
              <Field
                name="description"
                component={LangTextField}
                label="Description"
                languages={formLanguages} />
            </FormSection>
            <Field
              name="languages"
              component={renderMultiChoiceField}
              label="Languages"
              options={langOptions} />
            <Field
              name="groupRoot"
              component={QuestionGroupContainer}
              root={true}
              />
            {/*<FieldArray 
              name="questions"
              component={QuestionListForm}
               />*/}
            <Button raised color="accent" className={classes.submitButton} type="submit">Submit</Button>
          </form>
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