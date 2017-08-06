import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AuthContainer from './AuthContainer';
import mockData from '../mockData';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControl, FormLabel, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: '30px'
  },
  langRow: {
    marginTop: '16px',
  },
  langLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingRight: '16px',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'block',
    marginTop: '10px',
  },
}));

const mapStateToProps = (state) => ({
  languages: Object.keys(mockData.languages).map((key) => mockData.languages[key]),
});

/* const renderTextField = ({
  label, 
  input,
  meta: { error },
  ...custom
}) =>
  <TextField 
    label={label}
    placeholder={label}
    error={!!error}
    helperText={error}
    {...input}
    {...custom}
    />;

class MultiChoiceField extends Component {
  render() {

  }
} */

const renderMultiCheckbox = ({})
class SurveyForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { classes, languages } = this.props;

    return (
      <AuthContainer>
        <Paper className={classes.root}>
          <form onSubmit={this.onSubmit}>
            <TextField
              required={true}
              label="Survey Title"
              placeholder="Survey Title"
              inputProps={{required: true}}
              fullWidth={true}
              margin="normal"
              />
            <TextField
              label="Description"
              placeholder="Description"
              fullWidth={true}
              margin="normal" />
            <FormControl className={classes.langRow}>
              <FormGroup row>
                <FormLabel className={classes.langLabel}>
                  Languages:
                </FormLabel>
                {
                  languages.map((lang) => 
                      <FormControlLabel
                        key={lang.key}
                        control={
                          <Checkbox
                            value={lang.key} />} 
                        label={lang.name}
                      /> 
                    )
                }
              </FormGroup>
              <FormHelperText></FormHelperText>
            </FormControl>
            <Button raised className={classes.button} type="submit" color="accent">Save</Button>
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