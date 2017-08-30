import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import Condition from './Condition';
import ChoiceListAnswer from './ChoiceListAnswer';
import { withStyles } from 'material-ui/styles';

const styles = {
  choices: {
    marginLeft: '20px',
  },
};

class ChoiceCondition extends Component{
  constructor(props) {
    super(props);

    this.state = { showChoiceToolbar: false };
  }
  render() {
    const { classes, controllingQuestions, formLanguages, choiceType, onRemove } = this.props;
    return (
      <div>
        <Condition
          onConditionValueChange={(val) => this.setState({ showChoiceToolbar: !!val })}
          controllingQuestions={controllingQuestions}
          onRemove={onRemove} />
        { this.state.showChoiceToolbar &&
          <div className={classes.choices}>
            <FieldArray
              name='choices'
              component={ChoiceListAnswer}
              controllingQuestions={controllingQuestions}
              formLanguages={formLanguages}
              choiceType={choiceType}
              onAddForm={false} />
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ChoiceCondition);