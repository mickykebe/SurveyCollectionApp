import React, { Component } from 'react';
import { FieldArray, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LangTextField from './LangTextField';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import CopyIcon from 'material-ui-icons/ContentCopy';
import CutIcon from 'material-ui-icons/ContentCut';
import DeleteIcon from 'material-ui-icons/Delete';
import FunctionIcon from 'material-ui-icons/Functions';
import ConditionCollapse from './ConditionCollapse';
import Overlay from 'components/Overlay';
import QuestionGroupListContainer from '../containers/QuestionGroupListContainer';
import { valFromLangObj } from 'utils';

const styles = (theme) => ({
  root: {
    margin: '16px',
  },
  header: {
    position: 'relative',
  },
  rootBox: {
    border: `1px solid ${theme.palette.common.faintBlack}`,
    marginBottom: theme.spacing.unit,
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
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
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

    const conditionExpand = props.group.condition.conditions.length > 0;
    this.state = { expanded: conditionExpand };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { 
      classes, 
      id, 
      root, 
      index, 
      formLanguages, 
      group, 
      controllingQuestions, 
      onRemove,
      disableFields = false,
      onFieldMouseEnter,
      onFieldMouseLeave,
      onCopy,
      onCut,
    } = this.props;

    return (
      <div>
        <div className={classes.header}>
          <AppBar position="static" color="default" elevation={2}>
            <Toolbar>
              <Typography type="subheading" color="inherit">
                {`${index+1}) Group: ${valFromLangObj(group.title)}`}
              </Typography>
              <div className={classes.flexGrow} />
                { !!controllingQuestions.length && 
                  <Tooltip title="Conditions to control group visibility" placement="bottom">
                    <IconButton onClick={this.handleExpandClick}>
                      <FunctionIcon />
                    </IconButton>
                  </Tooltip>
                }
              <Tooltip title="Copy group" placement="bottom">
                <IconButton onClick={onCopy}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cut group" placement="bottom">
                <IconButton onClick={onCut}>
                  <CutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Group">
                <IconButton onClick={onRemove}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <FormSection name="condition">
            <ConditionCollapse
              expanded={this.state.expanded}
              controllingQuestions={controllingQuestions} />
          </FormSection>
          <div className={classes.content}>
            <FormSection name="title">
              <LangTextField
                label="Title"
                languages={formLanguages}
                labelClassName={classes.titleLabel}
                inputGroupClassName={classes.inputs}
                disabled={disableFields}
                onMouseEnter={onFieldMouseEnter}
                onMouseLeave={onFieldMouseLeave} />
            </FormSection>
          </div>
          { disableFields && <Overlay />}
        </div>
        <div className={classes.content}>
          <div className={classes.elements}>
            <FieldArray
              name="groupElements"
              formLanguages={formLanguages}
              component={QuestionGroupListContainer}
              root={root}
              groupId={id}
              disableFields={disableFields}
              />
          </div>
        </div>
      </div>
    );
  }
}

function RootQuestionGroup({ id, root, formLanguages }) {
  return <FieldArray
    name="groupElements"
    formLanguages={formLanguages}
    component={QuestionGroupListContainer}
    root={root}
    groupId={id}
    />
}

function CardWrapper(props) {
  if(props.rootChild) {
    return (
      <Card className={props.classes.root}>
        <QuestionGroup {...props} />
      </Card>
    );
  }
  if(!props.root) {
    return (
      <div className={props.classes.rootBox}>
        <QuestionGroup {...props} />
      </div>
    );
  }
  return <RootQuestionGroup {...props} />;
  
}

export default withStyles(styles)(CardWrapper);