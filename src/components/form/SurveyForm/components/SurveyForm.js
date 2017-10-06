import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { renderMultiChoiceField } from 'components/form/helper/fieldRenderers';
import LangTextField from './LangTextField';
import QuestionGroupContainer from '../containers/QuestionGroupContainer';
import { toApiData } from '../utils';

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

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { activeLanguages: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const data = toApiData(values);
    this.props.onSubmit(data);
  }

  render() {
    const { 
      classes, 
      allLanguages, 
      formLanguages, 
      handleSubmit,
      submittingForm,
    } = this.props;
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
            <FormSection name="groupRoot">
              <Field
                name="groupRoot"
                component={QuestionGroupContainer}
                root={true}
                />
            </FormSection>
            <Button 
              raised 
              color="accent" 
              className={classes.submitButton} 
              type="submit"
              disabled={submittingForm}>Save</Button>
          </form>
        </div>
    );
  }
}

export default withStyles(styles)(SurveyForm);