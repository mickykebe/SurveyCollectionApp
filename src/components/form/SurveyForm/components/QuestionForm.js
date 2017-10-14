import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FunctionIcon from 'material-ui-icons/Functions';
import LangTextField from './LangTextField';
import QuestionTypeContainer from '../containers/QuestionTypeContainer';
import ConditionCollapse from './ConditionCollapse';
import { valFromLangObj } from 'utils';

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
  overflow: {
    overflow: 'visible',
  },
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    const conditionExpand = this.props.question.condition.conditions.length > 0;
    this.state = { expanded: conditionExpand };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, question, index, formLanguages, controllingQuestions, disableFields = false } = this.props;
    const { onRemove } = this.props;

    return (
      <div>
        <CardContent>
          <Typography type="subheading" align="center">
            {`${index+1}) Question: ${valFromLangObj(question.title)}`}
          </Typography>
          <FormSection name="title">
            <LangTextField
              label="Title"
              languages={formLanguages}
              labelClassName={classes.titleLabel}
              inputGroupClassName={classes.inputs}
              required={true}
              disabled={disableFields} />
          </FormSection>
          <QuestionTypeContainer
            activeQuestionType={question.type}
            controllingQuestions={controllingQuestions}
            formLanguages={formLanguages}
            disableFields={disableFields} />
        </CardContent>
        <Divider />
        <CardActions>
          { controllingQuestions.length &&
            <IconButton onClick={this.handleExpandClick}>
              <FunctionIcon />
            </IconButton>
          }
          <div className={classes.flexGrow} />
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <FormSection name="condition">
          <ConditionCollapse
            expanded={this.state.expanded}
            controllingQuestions={controllingQuestions} />
        </FormSection>
      </div>
    );
  }
}

function CardWrapper(props) {
  if(props.rootChild) {
    return (
      <Card className={props.classes.root}>
        <QuestionForm {...props} />
      </Card>
    );
  }
  return <QuestionForm {...props} />;
}

export default withStyles(styles)(CardWrapper);