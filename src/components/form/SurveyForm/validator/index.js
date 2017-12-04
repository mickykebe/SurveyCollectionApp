import _isEmpty from 'lodash/isEmpty';

const langInputErrors = (value, languages) => {
  if(!languages || !languages.length) {
    return 'Required';
  }
  else {
    const errors = {};
    languages.forEach(lang => {
      if(!value || !value[lang]) {
        errors[lang] = 'Required';
      }
    });
    return errors;
  }
}

const dateErrors = (question) => {
  const errors = {};
  if(question && question.type === 'date') {
    if(!question.calendar) {
      errors.calendar = 'Required';
    }
  }
  return errors;
}

const numRangeErrors = (question) => {
  const errors = {};
  if(question && question.type === 'number-range') {
    if(!question.end) {
      errors.end = 'Required';
    }
    else if(isNaN(Number(question.end))){
      errors.end = 'Must be a number';
    }
    if(!question.start) {
      errors.start = 'Required';
    }
    else if(isNaN(Number(question.start))){
      errors.start = 'Must be a number';
    }
    if(question.start &&
      question.end && 
      !isNaN(Number(question.start)) && 
      !isNaN(Number(question.end)) &&
      Number(question.start) >= Number(question.end)){
      errors.start = errors.end = 'Starting number exceeds end number';
    }
  }
  return errors;
}

const choiceErrors = (choices, languages) => {
  const errors = [];
  choices.forEach((choice, i) => {
    if(!languages || !languages.length) {
      errors[i] = { _error: 'At least one language required' };
    }
    else {
      const choiceErrors = { text: {} };
      languages.forEach((lang) => {
        if(!choice || !choice.text || !choice.text[lang]) {
          choiceErrors.text[lang] = 'Required';
          errors[i] = choiceErrors;
        }
      });
    }
  });
  return errors;
}

const conditionErrors = (value) => {
  const errors = {};
  if(value && value.conditions) {
    const condErrors = [];
    value.conditions.forEach((condition, i) => {
      if(!condition) {
        condErrors[i] = { _error: 'Invalid condition' };
      }
      else {
        if(condition.type === 'relational' && !condition.question) {
          condErrors[i] = { question: 'Question not specified' };
        }
        else if(condition.type === 'logical') {
          const errors = conditionErrors(condition);
          if(!_isEmpty(errors)) {
            condErrors[i] = errors;
          }
        }
      }
    });
    if(condErrors.length) {
      errors.conditions = condErrors;
    }
  }
  return errors;
}

const questionErrors = (value, languages) => {
  const errors = {};
  if(!value.type) {
    errors.type = 'Required';
  }
  const titleErrors = langInputErrors(value.title, languages);
  if(!_isEmpty(titleErrors)) {
    errors.title = titleErrors;
  }

  const condErrors = conditionErrors(value.condition);
  if(!_isEmpty(condErrors)) {
    errors.condition = condErrors;
  }

  const date_errors = dateErrors(value);
  Object.assign(errors, date_errors);
  
  const rangeErrors = numRangeErrors(value);
  Object.assign(errors, rangeErrors);

  if(value.type === 'choose-one' || value.type === 'choose-any') {
    if(!value.choices || !value.choices.length) {
      errors.choices = { _error: 'At least one choice must be added' };
    }
    else {
      const choiceListErrors = choiceErrors(value.choices, languages);
      if(choiceListErrors.length)
        errors.choices = choiceListErrors;
    }
  }
  return errors;
}

const groupErrors = (value, languages) => {
  if(!value || !value.groupElements || !value.groupElements.length) {
    return { _error: "Group must have at least one question" }
  }
  const errors = {};
  const condErrors = conditionErrors(value.condition);
  if(!_isEmpty(condErrors)) {
    errors.condition = condErrors;
  }
  const groupElemErrors = [];
  value.groupElements.forEach((elem, i) => {
    if(!elem || !elem.schema || (elem.schema !== 'group' && elem.schema !== 'question')) {
      groupElemErrors[i] = { _error: 'Invalid group Element' };
    }
    else {
      const errors = {};
      if(elem.schema === 'group') {
        Object.assign(errors, groupErrors(elem, languages));
      }
      else {
        Object.assign(errors, questionErrors(elem, languages));
      }
      if(!_isEmpty(errors)) {
        groupElemErrors[i] = errors;
      }
    }
  });
  if(groupElemErrors.length){
    errors.groupElements = groupElemErrors;
  }
  return errors;
}

const validate = values => {
  const errors = {};
  const titleErrors = langInputErrors(values.title, values.languages);
  if(!_isEmpty(titleErrors)) {
    errors.title = titleErrors;
  }
  if(!values.languages || !values.languages.length) {
    errors.languages = 'At least one language must be selected';
  }
  const groupRootErrors = groupErrors(values.groupRoot, values.languages);
  if(!_isEmpty(groupRootErrors)) {
    errors.groupRoot = groupRootErrors;
  }
  return errors;
}

export default validate;