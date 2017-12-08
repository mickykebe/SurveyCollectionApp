import React, { Component } from 'react';
import { FieldArray, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Card from 'material-ui/Card';
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
import QuestionBottomActions from './QuestionBottomActions';
import QuestionGroupListContainer from '../containers/QuestionGroupListContainer';
import { valFromLangObj } from 'utils';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit,
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
  bottomActions: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
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
      hideRemoveButton
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
              {
                !hideRemoveButton &&
                <Tooltip title="Delete Group">
                  <IconButton onClick={onRemove}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
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

class LayoutWrapper extends Component {
  render() {
    const { classes, rootChild, root, onAddQuestion, onAddGroup, disableFields } = this.props;
    if(root)
      return <RootQuestionGroup {...this.props} />;
    let Component;
    if(rootChild) {
      Component = (
        <Card className={classes.root}>
          <QuestionGroup {...this.props} />
        </Card>
      );
    }
    else {
      Component = (
        <div className={classes.rootBox}>
          <QuestionGroup {...this.props} />
        </div>
      );
    }

    return (
      <div>
        {Component}
        {
          !disableFields &&
          <div className={classes.bottomActions}>
            <div className={classes.flexGrow} />
            <QuestionBottomActions
              withElevation={this.props.rootChild}
              onAddClick={onAddQuestion}
              onAddGroupClick={onAddGroup} />
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(LayoutWrapper);