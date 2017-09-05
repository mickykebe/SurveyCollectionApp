import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FunctionIcon from 'material-ui-icons/Functions';
import Collapse from 'material-ui/transitions/Collapse';
import LangTextField from './LangTextField';
import QuestionTypeContainer from '../containers/QuestionTypeContainer';
import ConditionGroupContainer from '../containers/ConditionGroupContainer';
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
  }
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, question, index, formLanguages, controllingQuestions } = this.props;
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
              required={true} />
          </FormSection>
          <Field
            name='type'
            component={QuestionTypeContainer}
            controllingQuestions={controllingQuestions}
            formLanguages={formLanguages} />
        </CardContent>
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
        <Collapse className={classes.overflow} in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          <CardContent>
            <FormSection name="condition">
              <Field
                name="condition"
                component={ConditionGroupContainer}
                controllingQuestions={controllingQuestions} />
            </FormSection>
          </CardContent>
        </Collapse>
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