import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
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
  }
}

class Condition extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedQuuid: null };
    this.onQuestionChange = this.onQuestionChange.bind(this);
  }

  onQuestionChange(e, uuid) {
    this.setState({
      selectedQuuid: uuid,
    });
  }

  getSelectedQuestion() {
    const uuid = this.state.selectedQuuid;
    return this.props.allQuestions.reduce((question, currentQuestion) => {
      return (question.uuid === uuid || currentQuestion.uuid !== uuid) ? question : currentQuestion;
    }, {});
  }

  render() {
    const { classes, allQuestions, currentQuestion, condition, onRemove } = this.props;
    
    const questionOptions = allQuestions
      .map((q, index) => ({ 
        label: (q.title && valFromLangObj(q.title)) || `Question #${index+1}`,
        val: q.uuid,
      }))
      .filter(option => option.val !== currentQuestion.uuid);

    return (
      <FormSection name={condition}>
        <div className={classes.root}>
          <div className={classes.conditionBox}>
            <Field
              name="question"
              component={renderMenuSelectField}
              label='Question'
              options={questionOptions}
              onChange={this.onQuestionChange}
              className={classes.selectQuestion}
              />
            { 
              this.state.selectedQuuid && 
              <Field
                name="conditionRHS"
                component={ConditionRHSContainer}
                question={this.getSelectedQuestion()}
                 />
            }
          </div>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </div>
      </FormSection>
    );
  }
}

export default withStyles(styles)(Condition);