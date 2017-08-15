import _isEmpty from 'lodash/isEmpty';

const validateQuestionTitle = (question, languages) => {
  const errors = {};
  if(!languages || !languages.length){
    if(!question || !question.title) {
      errors._error = 'Title is required';
    }
  }
  else {
    languages.forEach((lang) => {
      if(!question || !question.title || !question.title[lang]) {
        errors[lang] = 'Required';
      }
    });
  }
  return errors;
}

const validateQuestionNumRange = (question) => {
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

const validateChoices = (choices, languages) => {
  const errors = [];
  choices.forEach((choice, index) => {
    if(!languages || !languages.length) {
      if(!choice || !choice.text) {
        errors[index] = { _error: 'At least one language required' };
      }
    }
    else {
      const choiceErrors = { text: {} };
      languages.forEach((lang) => {
        if(!choice || !choice.text || !choice.text[lang]) {
          choiceErrors.text[lang] = 'Required';
          errors[index] = choiceErrors;
        }
      });
    }
  });
  return errors;
}

const validate = values => {
  const errors = {};
  if(!values.title) {
    errors.title = 'Required';
  }
  if(!values.languages || !values.languages.length) {
    errors.languages = 'At least one language must be selected';
  }
  if(!values.questions || !values.questions.length) {
    errors.questions = { _error: 'At least one question must be added'};
  }
  else {
    const questionListErrors = [];
    values.questions.forEach((question, qIndex) => {
      let questionErrors = {};
      if(!question || !question.type) {
        questionErrors.type = 'Required';
      }
      const titleErrors = validateQuestionTitle(question, values.languages);
      if(!_isEmpty(titleErrors)){
        questionErrors.title = titleErrors;
      }
      const numRangeErrors = validateQuestionNumRange(question);
      questionErrors = { ...questionErrors, ...numRangeErrors};

      if(question && (question.type === 'choose-one' || question.type === 'choose-any')) {
        if(!question.choices || !question.choices.length) {
          questionErrors.choices = { _error: 'At least one choice must be added' };
        }
        else {
          const choiceListErrors = validateChoices(question.choices, values.languages);
          if(choiceListErrors.length)
            questionErrors.choices = choiceListErrors;
        }
      }

      if(!_isEmpty(questionErrors)) {
        questionListErrors[qIndex] = questionErrors;
      }
    });
    if(questionListErrors.length) {
      errors.questions = questionListErrors;
    }
  }
  return errors;
}

export default validate;