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
      choiceConditions.push(condition);
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
      questions.push({ group: group.uuid, ...groupElement });
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


export function toApiData(formData) {
  const { groupRoot, ...surveyFields } = formData;
  const { questions, groups } = groupsAndQuestions(groupRoot);
  return { ...surveyFields, questions, groups };
}