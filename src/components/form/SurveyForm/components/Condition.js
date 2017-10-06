import React, { Component } from 'react';
import { Field } from 'redux-form';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ConditionRHSContainer from 'components/form/SurveyForm/containers/ConditionRHSContainer';
import { valFromLangObj } from 'utils';

const styles = {
  root: {
    display: 'flex',
  },
  conditionBox: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  selectQuestion: {
    flex: 1,
  },
  deleteIcon: {
    alignSelf: 'center',
  }
}

class Condition extends Component {
  render() {
    const { 
      classes,
      question: questionId,
      controllingQuestions,
      onRemove } = this.props;
    
    const questionOptions = controllingQuestions
      .map((q, index) => ({ 
        label: (q.title && valFromLangObj(q.title)) || `Question #${index+1}`,
        val: q.uuid,
      }));

    return (
      <div className={classes.root}>
        <div className={classes.conditionBox}>
          <Field
            name="question"
            component={renderMenuSelectField}
            label='Question'
            options={questionOptions}
            className={classes.selectQuestion}
            />
          <ConditionRHSContainer
            questionId={questionId}
            controllingQuestions={controllingQuestions} />
        </div>
        <IconButton className={classes.deleteIcon} onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(Condition);