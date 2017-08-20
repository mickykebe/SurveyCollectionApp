import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import _get from 'lodash/get';
import MenuSelectField from 'components/form/controls/MenuSelectField';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ConditionRHSContainer from 'components/form/SurveyForm/containers/ConditionRHSContainer';

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

const questionTitle = (titleObj, code = 'en') => {
  return Object.keys(titleObj).reduce((title, key) => {
    if(key == code) {
      return titleObj[key];
    }
    if(!title) {
      return titleObj[key];
    }
    return title;
  }, '');
}

class Condition extends Component {
  constructor(props) {
    super(props);

    this.state = { question: null };
    this.onQuestionChange = this.onQuestionChange.bind(this);
  }

  onQuestionChange(e, uuid) {
    this.setState({
      question: this.props.allQuestions.find((question) => question.uuid === uuid),
    });
  }

  render() {
    const { classes, allQuestions, currentQuestion, condition, onRemove } = this.props;
    const questions = allQuestions.filter((q) => q.uuid !== currentQuestion.uuid);
    
    const questionOptions = questions.map((q) => ({ 
      label: (q.title && questionTitle(q.title)) || `Question #${q.index}`,
      val: q.uuid,
    }));
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
              this.state.question && 
              <Field
                name="conditionRHS"
                component={ConditionRHSContainer}
                question={this.state.question}
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