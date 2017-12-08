import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Card, { CardContent, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { FormControlLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import CopyIcon from 'material-ui-icons/ContentCopy';
import CutIcon from 'material-ui-icons/ContentCut';
import DeleteIcon from 'material-ui-icons/Delete';
import FunctionIcon from 'material-ui-icons/Functions';
import GroupAddIcon from 'material-ui-icons/PlaylistAdd';
import LangTextField from './LangTextField';
import QuestionTypeContainer from '../containers/QuestionTypeContainer';
import ConditionCollapse from './ConditionCollapse';
import Overlay from 'components/Overlay';
import QuestionBottomActions from './QuestionBottomActions';
import { valFromLangObj } from 'utils';
import { renderSwitch } from '../../helper/fieldRenderers';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  rootBox: {
    border: `1px solid ${theme.palette.common.faintBlack}`,
    marginBottom: theme.spacing.unit,
  },
  content: {
    position: 'relative',
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
  bottomActions: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  verticalDivider: {
    margin: `0 ${theme.spacing.unit}px`,
    borderRight: `1px solid ${theme.palette.common.minBlack}`,
    height: theme.spacing.unit * 4,
    width: 0,
  },
  switchBar: {},
  switch: {
    color: theme.palette.secondary['A200'],
    '& + $switchBar': {
      backgroundColor: theme.palette.secondary['A200'],
    }
  }
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
    const { 
      classes,
      question,
      index,
      formLanguages,
      controllingQuestions,
      onFieldMouseEnter,
      onFieldMouseLeave,
      disableFields = false,
      onRemove,
      onCopy,
      onCut,
     } = this.props;

    return (
      <div className={classes.content}>
        <AppBar position="static" color="default" elevation={2}>
          <Toolbar>
            <Typography type="subheading" color="inherit">
              {`${index+1}) Question: ${valFromLangObj(question.title)}`}
            </Typography>
            <div className={classes.flexGrow} />
            { !!controllingQuestions.length &&
              <Tooltip title="Conditions to control question visibility" placement="bottom">
                <IconButton onClick={this.handleExpandClick}>
                  <FunctionIcon />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Copy question" placement="bottom">
              <IconButton onClick={onCopy}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cut question" placement="bottom">
              <IconButton onClick={onCut}>
                <CutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Question" placement="bottom">
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
        <CardContent>
          <FormSection name="title">
            <LangTextField
              label="Title"
              languages={formLanguages}
              labelClassName={classes.titleLabel}
              inputGroupClassName={classes.inputs}
              required={true}
              disabled={disableFields}
              onMouseEnter={onFieldMouseEnter}
              onMouseLeave={onFieldMouseLeave} />
          </FormSection>
          <QuestionTypeContainer
            activeQuestionType={question.type}
            controllingQuestions={controllingQuestions}
            formLanguages={formLanguages}
            disableFields={disableFields}
            onFieldMouseEnter={onFieldMouseEnter}
            onFieldMouseLeave={onFieldMouseLeave} />
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.flexGrow} />
          <FormControlLabel
            control={
              <Field
                name="required"
                component={renderSwitch}
                classes={{
                  checked: classes.switch,
                  bar: classes.switchBar
                }}
                />
            }
            label="Required" />
        </CardActions>
        {disableFields && <Overlay />}
      </div>
    );
  }
}

class LayoutWrapper extends Component {
  render() {
    const { classes, rootChild, onAddQuestion, onAddGroup, disableFields } = this.props;
    let Component;
    if(rootChild) {
      Component = (
        <Card className={classes.root}>
          <QuestionForm {...this.props} />
        </Card>
      );
    }
    else
      Component = (
        <div className={classes.rootBox}>
          <QuestionForm {...this.props} />
        </div>
      )
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