const normalizeCondition = (condition) => {
  if(condition.operator === 'one-of') {
    const { value, ..._condition } = condition;
    const _value = value.map((v) => v.val);
    return { ..._condition, value: _value};
  }
  return condition;
}

const choicesAndConditions = (rawChoices) => {
  let choices = [];
  let choiceConditions = [];
  rawChoices.forEach(element => {
    if(element.schema === 'choice') {
      choices.push(element);
    }
    else if(element.schema === 'choice_condition') {
      const { choices: subChoices, ...condition} = element;
      condition.choices = subChoices.map(choice => choice.uuid);
      choiceConditions.push(normalizeCondition(condition));
      choices = [ ...choices, ...subChoices];
    }
  });

  return { choices, choice_conditions: choiceConditions};
}

const normalizeQuestion = (question) => {
  const { choices: rawChoices = [], ...q } = question;
  const { choices, choice_conditions } = choicesAndConditions(rawChoices);
  return { ...q, choices, choice_conditions };
}

const groupsAndQuestions = (groupRoot) => {
  const { groupElements, ...group } = groupRoot;
  let questions = [];
  let groups = [group, ];

  group.questions = [];
  groupElements.forEach((groupElement) => {
    if(groupElement.schema === 'question') {
      const question = normalizeQuestion(groupElement);
      group.questions.push(groupElement.uuid);
      questions.push({ group: group.uuid, ...question });
    }
    else if(groupElement.schema === 'group') {
      const subGroup = { parent: group.uuid, ...groupElement };
      const {groups: subGroups, questions: subQuestions} = groupsAndQuestions(subGroup);
      groups = [...groups, ...subGroups];
      questions = [...questions, ...subQuestions];
    }
  });
  return { groups, questions };
}

// Transforms the form data to the api schema
export function toApiData(formData) {
  const { groupRoot, ...surveyFields } = formData;
  const { questions, groups } = groupsAndQuestions(groupRoot);
  return { ...surveyFields, questions, groups };
}

//Transforms the api data back to the survey form schema
export function toApiSchema(apiData) {
  const { groups, questions, ...survey } = apiData;
  const rootGroup = getRootGroup(groups);
  const groupRoot = buildFormGroup(rootGroup, groups, questions);
  return { ...survey, groupRoot };
}

const getRootGroup = (groups) => {
  return groups.reduce((rootGroup, currentGroup) => {
    if(!!rootGroup) {
      return rootGroup;
    }
    if(currentGroup.root) {
      return currentGroup;
    }
    return null;
  }, null);
}

const buildFormGroup = (rootGroup, groups, questions) => {
  const { questions: questionIds, ...group } = rootGroup;
  const subGroups = groups
    .filter(group => group.parent === rootGroup.uuid)
    .map(group => buildFormGroup(group, groups, questions));
  const subQuestions = questions
    .filter(question => question.group === rootGroup.uuid)
    .map(question => buildFormQuestion(question));
  const groupElements = [...subGroups, ...subQuestions];
  return { ...group, schema: 'group', groupElements };
}

const buildFormQuestion = (question) => {
  const buildChoiceCondition = (choiceCondition, choices) => {
    const { choices: choiceIds, ..._choiceCondition } = choiceCondition;
    const _choices = choices
      .filter(choice => !!choiceIds.findIndex((choiceId) => choiceId === choice.uuid))
      .map(choice => ({ ...choice, schema: 'choice'}));
    return { ..._choiceCondition, choices: _choices, schema: 'choice_condition' };
  }

  const choicesWithoutConditions = (choiceConditions, choices) => {
    return choices.filter(
      choice => choiceConditions.reduce((found, condition) => {
        if(found) {
          return true;
        }
        const choiceIds = condition.choices || [];
        return !!choiceIds.findIndex(id => id === choice.uuid);
      }, false)
    ).map(choice => ({...choice, schema: 'choice'}));
  }

  const { choice_conditions = [], choices = [], ..._question } = question;
  const choiceConditionElems = choice_conditions.map((choiceCondition => buildChoiceCondition(choiceCondition, choices)));
  const choiceElems = choicesWithoutConditions(choice_conditions, choices);
  return { ..._question, choices: [...choiceElems, ...choiceConditionElems ], schema: 'question'};
}