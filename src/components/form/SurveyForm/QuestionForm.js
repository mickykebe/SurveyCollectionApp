import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormSection, formValueSelector } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { getLanguagesFromCodes } from 'reducers';
import { surveyFormName } from 'constantValues';
import LangTextField from './LangTextField';
import QuestionTypeContainer from './QuestionTypeContainer';

const stylesheet = createStyleSheet((theme) => ({
  root: {
    margin: '16px',
  },
  actionButton: {
    margin: theme.spacing.unit,
  },
  titleLabel: {
    flex: 1,
  },
  inputs: {
    flex: 3,
  }
}));

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state) => {
  const langCodes = formSelector(state, 'languages');
  const formLanguages = getLanguagesFromCodes(undefined, langCodes);

  return {
    formLanguages
  };
};

class QuestionForm extends Component {
  render() {
    const { classes, question, index, formLanguages } = this.props;
    const { onRemove } = this.props;
    console.log(question);
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography type="subheading" align="center">
            {`Question #${index+1}`}
          </Typography>
          <FormSection name={`${question}.title`}>
            <LangTextField
              label="Title"
              languages={formLanguages}
              labelClassName={classes.titleLabel}
              inputGroupClassName={classes.inputs} />
          </FormSection>
          <QuestionTypeContainer 
            question={question}
            formLanguages={formLanguages} />
        </CardContent>
        <CardActions>
          <IconButton className={classes.actionButton}>
            <DeleteIcon onClick={onRemove} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(stylesheet),
)(QuestionForm);