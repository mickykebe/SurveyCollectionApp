import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import PublishIcon from 'material-ui-icons/Publish';
import SaveIcon from 'material-ui-icons/Save';
import { renderMultiChoiceField } from 'components/form/helper/fieldRenderers';
import LangTextField from './LangTextField';
import QuestionGroupContainer from '../containers/QuestionGroupContainer';
import { toApiData } from '../utils';

const styles = theme => ({
  root: {
    padding: '30px'
  },
  actions: {
    display: 'flex',
    paddingTop: theme.spacing.unit * 2,
    justifyContent: 'center',
  },
  actionButton: {
    margin: theme.spacing.unit,
  },
});

class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { activeLanguages: [] };
  }

  save = (values) => {
    const data = toApiData(values);
    this.props.onSubmit(data);
  }

  publish = (values) => {
    const data = toApiData({ ...values, active: true });
    this.props.onSubmit(data);
  }

  componentWillMount() {
    this.props.initializeForm();
  }

  render() {
    const { 
      classes, 
      allLanguages, 
      formLanguages, 
      handleSubmit,
      submittingForm,
      rootGroupId,
      initialValues
    } = this.props;
    const langOptions = allLanguages.map((lang) => ({val: lang.code, label: lang.name}));

    return (
        <div className={classes.root}>
          <form onSubmit={handleSubmit(this.save)}>
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
                id={rootGroupId}
                name="groupRoot"
                component={QuestionGroupContainer}
                root={true}
                />
            </FormSection>
            <div className={classes.actions}>
              <Tooltip title="Save survey">
                <Button
                  fab
                  color="accent"
                  className={classes.actionButton} 
                  type="submit"
                  disabled={submittingForm}>
                  <SaveIcon />
                </Button>
              </Tooltip>
              {
                !initialValues.active &&
                <Tooltip title="Publish survey">
                  <Button
                    fab
                    color="accent"
                    className={classes.actionButton}
                    onClick={handleSubmit(this.publish)}
                    disabled={submittingForm}>
                    <PublishIcon />
                  </Button>
                </Tooltip>
              }
            </div>
          </form>
        </div>
    );
  }
}

export default withStyles(styles)(SurveyForm);