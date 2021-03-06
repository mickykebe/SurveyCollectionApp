import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import AppBar from 'material-ui/AppBar';
import { FormHelperText } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';
import { withStyles } from 'material-ui/styles';
import ChoiceAnswer from './ChoiceAnswer';
import ChoiceConditionContainer from '../containers/ChoiceConditionContainer';
import { uuidv4 } from 'utils';

const styles = (theme) => ({
  errorMessage: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  flexGrow: {
    flex: '1 1 auto'
  },
});

class ChoiceListAnswer extends Component {
  createChoice = () => {
    return { uuid: uuidv4(), schema: 'choice', index: 1 };
  }
  createChoiceConditional = () => {
    return { uuid: uuidv4(), schema: 'choice_condition', operator: '== ' };
  }
  
  render() {
    const { 
      classes, 
      fields, 
      choiceType, 
      formLanguages, 
      controllingQuestions,
      onAddChoiceConditional = () => this.props.fields.push(this.createChoiceConditional()),
      meta: { dirty, error },
      disableFields = false,
      onFieldMouseEnter,
      onFieldMouseLeave,
    } = this.props;

    return (
      <div>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography type="subheading" color="inherit">
              Choices
            </Typography>
            <div className={classes.flexGrow} />
            <Tooltip title="Add choice" placement="top">
              <IconButton onClick={() => fields.push(this.createChoice())}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            {
              !!controllingQuestions.length && !!onAddChoiceConditional &&
              <Tooltip title="Add conditional choice" placement="top">
                <IconButton onClick={onAddChoiceConditional}>
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
            }
          </Toolbar>
        </AppBar>
        <FormHelperText error className={classes.errorMessage}>{dirty && error}</FormHelperText>
        {
          fields.map((choice, index) => {
            const choiceSchema = fields.get(index).schema;
            return (
              <FormSection 
              key={choice}
              name={choice}>
                {
                  choiceSchema === 'choice_condition' &&
                  <ChoiceConditionContainer
                    choiceType={choiceType}
                    formLanguages={formLanguages}
                    onRemove={() => fields.remove(index)}
                    controllingQuestions={controllingQuestions}
                    disableFields={disableFields}
                    onFieldMouseEnter={onFieldMouseEnter}
                    onFieldMouseLeave={onFieldMouseLeave} />
                }
                {
                  choiceSchema === 'choice' &&
                  <ChoiceAnswer
                    choiceType={choiceType}
                    formLanguages={formLanguages}
                    onRemove={() => fields.remove(index)}
                    disabled={disableFields}
                    onMouseEnter={onFieldMouseEnter}
                    onMouseLeave={onFieldMouseLeave}
                    onAddChoiceAfter={() => fields.insert(index+1, this.createChoice())}
                    onAddChoiceConditionAfter={(!!controllingQuestions.length && !!onAddChoiceConditional) ? () => fields.insert(index+1, this.createChoiceConditional()) : false}
                    />
                }
              </FormSection>);
          })
        }
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceListAnswer);