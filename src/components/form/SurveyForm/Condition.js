import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import _get from 'lodash/get';
import MenuSelectField from 'components/form/controls/MenuSelectField';
import { renderMenuSelectField } from 'components/form/helper/fieldRenderers';
import { questionTitle } from '/helper/questions';

export default questionTitle = (titleObj, code = 'en') => {
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

const mapStateToProps = (state) => ({
  questions: _get(state, 'form.surveyForm.values.questions', []),
});

class Condition extends Component {
  constructor(props) {
    super(props);

    this.state = { question: null };
    this.onQuestionChange = this.onQuestionChange.bind(this);
  }

  onQuestionChange(uuid) {
    this.setState({
      question: this.props.questions.find((question) => question.uuid === uuid),
    });
  }

  render() {
    const { questions, condition } = this.props;
    const { questionOptions } = questions.map((q, index) => ({ 
      label: questionTitle(q.title) || `Question #${index}`,
      val: q.uuid,
    }));
    return (
      <div>
        <Field
          name={`${condition}.question`}
          component={renderMenuSelectField}
          label='Question'
          options={questionOptions}
          onChange={this.onQuestionChange}
          />
        { 
          this.state.question && 
          <span>
            
          </span>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Condition);