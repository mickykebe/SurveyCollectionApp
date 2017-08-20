import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Field, FormSection, formValueSelector } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FunctionIcon from 'material-ui-icons/Functions';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import { getLanguagesFromCodes } from 'reducers';
import { surveyFormName } from 'constantValues';
import LangTextField from './LangTextField';
import QuestionTypeContainer from './QuestionTypeContainer';
import ConditionGroupContainer from 'components/form/SurveyForm/containers/ConditionGroupContainer';

const styles = (theme) => ({
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
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

const formSelector = formValueSelector(surveyFormName);
const mapStateToProps = (state) => {
  const langCodes = formSelector(state, 'languages');
  const formLanguages = getLanguagesFromCodes(undefined, langCodes);

  return {
    formLanguages
  };
};

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, input: { name: question }, index, formLanguages } = this.props;
    const { onRemove } = this.props;
    
    return (
      <FormSection name={question}>
        <Card className={classes.root}>
          <CardContent>
            <Typography type="subheading" align="center">
              {`Question #${index+1}`}
            </Typography>
            <FormSection name="title">
              <LangTextField
                label="Title"
                languages={formLanguages}
                labelClassName={classes.titleLabel}
                inputGroupClassName={classes.inputs} />
            </FormSection>
            <Field
              name={question}
              question={question}
              component={QuestionTypeContainer}
              formLanguages={formLanguages} />
          </CardContent>
          <CardActions>
            <IconButton  onClick={this.handleExpandClick}>
              <FunctionIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton  onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
          <Divider light />
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <FormSection name="condition">
                <Field
                  name="condition"
                  component={ConditionGroupContainer}
                  question={question} />
              </FormSection>
            </CardContent>
          </Collapse>
        </Card>
      </FormSection>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(QuestionForm);