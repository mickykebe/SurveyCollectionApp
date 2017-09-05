import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import LangTextField from './LangTextField';
import IconButton from 'material-ui/IconButton';
import FunctionIcon from 'material-ui-icons/Functions';
import DeleteIcon from 'material-ui-icons/Delete';
import Collapse from 'material-ui/transitions/Collapse';
import QuestionGroupList from './QuestionGroupList';
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
  content: {
    width: '95%',
    margin: '0 auto',
  },
  elements: {
    marginTop: '8px',
  },
  overflow: {
    overflow: 'visible',
  }
});

class QuestionGroup extends Component{
  constructor(props) {
    super(props);

    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, root, index, formLanguages, group, controllingQuestions, onRemove } = this.props;
    return (
      <div>
        <CardContent className={classes.content}>
          <Typography type="subheading" align="center">
            {`${index+1}) Group: ${valFromLangObj(group.title)}`}
          </Typography>
          <FormSection name="title">
            <LangTextField
              label="Title"
              languages={formLanguages}
              labelClassName={classes.titleLabel}
              inputGroupClassName={classes.inputs} />
          </FormSection>
          <div className={classes.elements}>
            <FieldArray
              name="groupElements"
              formLanguages={formLanguages}
              component={QuestionGroupList}
              root={root}
              />
          </div>
        </CardContent>
        <CardActions>
          { controllingQuestions.length && 
            <IconButton onClick={this.handleExpandClick}>
              <FunctionIcon />
            </IconButton>
          }
          <div className={classes.flexGrow}/>
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

function RootQuestionGroup({ root, formLanguages }) {
  return <FieldArray
    name="groupElements"
    formLanguages={formLanguages}
    component={QuestionGroupList}
    root={root}
    />
}

function CardWrapper(props) {
  const QGComponent = props.root ? RootQuestionGroup : QuestionGroup;
  if(props.rootChild) {
    return (
      <Card className={props.classes.root}>
        <QGComponent {...props} />
      </Card>
    );
  }
  return <QGComponent {...props} />;
}

export default withStyles(styles)(CardWrapper);