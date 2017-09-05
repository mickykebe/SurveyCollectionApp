import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth, * as fromAuth from './auth';
import common, * as fromCommon from './common';
import surveys, * as fromSurveys from './surveys';
import questions, * as fromQuestions from './questions';
import groups, * as fromGroups from './groups';
import choices, * as fromChoices from './choices';
import choiceConditions, * as fromChoiceConditions from './choiceConditions';
import languages, * as fromLanguages from './languages';
import questionTypes, * as fromQuestionTypes from './questionTypes';
import operators, * as fromOperators from './operators';
import ui, * as fromUi from './ui';

export default combineReducers({
  common,
  auth,
  surveys,
  questions,
  groups,
  choices,
  choiceConditions,
  languages,
  questionTypes,
  operators,
  ui,
  form: formReducer,
});

//Common selectors
export const getCurrentUser = (state) =>
  fromCommon.getCurrentUser(state.common);
export const getAppLoadError = (state) =>
  fromCommon.getAppLoadError(state.common);

//Auth selectors
export const getIsAuthenticating = (state) =>
  fromAuth.getIsAuthenticating(state.auth);
export const getAuthErrors = (state) =>
  fromAuth.getAuthErrors(state.auth);

//Survey selectors
export const getIsCreatingSurvey = (state) =>
  fromSurveys.getIsCreatingSurvey(state.surveys);
export const getSurveyCreateErrors = (state) =>
  fromSurveys.getSurveyCreateErrors(state.surveys);
export const getIsFetchingSurveyFeed = (state) =>
  fromSurveys.getIsFetchingSurveyFeed(state.surveys);
export const getSurveyFeedFetchErrors = (state) =>
  fromSurveys.getSurveyFeedFetchErrors(state.surveys);
export const getIsFetchingSurvey = (state) =>
  fromSurveys.getIsFetchingSurvey(state.surveys);
export const getSurveyFetchErrors = (state) =>
  fromSurveys.getSurveyFetchErrors(state.surveys);
export const getIsUpdatingSurvey = (state) =>
  fromSurveys.getIsUpdatingSurvey(state.surveys);

//Question selectors
export const getQuestion = (state, id) =>
  fromQuestions.getQuestion(state.questions, id);

//Group selectors
export const getGroup = (state, id) =>
  fromGroups.getGroup(state.groups, id);

//Choice selectors
export const getChoices = (state, id) =>
  fromChoices.getChoice(state.choices, id);

//Choice condition selectors
export const getChoiceConditions = (state, id) =>
  fromChoiceConditions.getChoiceCondition(state.choiceConditions, id);

//Language selectors
export const getAllLanguages = (state) => 
  fromLanguages.getAllLanguages(state.languages);
export const getLanguage = (state, code) => 
  fromLanguages.getLanguage(state.languages, code);
export const getLanguagesFromCodes = (state, codes) => 
  fromLanguages.getLanguagesFromCodes(state.languages, codes);

//Question type selectors
export const getAllQuestionTypes = (state) => 
  fromQuestionTypes.getAllQuestionTypes(state.questionTypes);

//Operator selectors
export const getOperators = (state, opCodes = fromOperators.OPERATOR_CODES_ALL) =>
  fromOperators.getOperators(state.operators, opCodes);

//Ui selectors
export const getPopupMessage = (state) =>
  fromUi.getPopupMessage(state.ui);

//Cross selectors
export const getQuestionTypeOperators = (state, id) => {
  const operatorCodes = fromQuestionTypes.getQuestionTypeOperators(state.questionTypes, id);
  return operatorCodes.map(code => fromOperators.getOperator(state.operators, code));
}
export const getCurrentUserSurveys = (state) => 
  fromSurveys.getUserSurveys(state.surveys, state.common.currentUser.id);

export const getSurveyFormData = (state, surveyId) => {
  const buildChoiceCondition = (choiceCondition, choices) => {
    const { choices: choiceIds = [], ..._choiceCondition } = choiceCondition;
    const _choices = choiceIds
      .map(id => fromChoices.getChoice(state.choices, id))
      .map(choice => ({ schema: 'choice', ...choice }));
    return { ..._choiceCondition, choices: _choices, schema: 'choice_condition'};
  }

  const choicesWithoutConditions = (choiceConditions, choices) => {
    return choices.filter(
      choice => !choiceConditions.reduce((found, condition) => {
        if(found)
          return true;
        const choiceIds = condition.choices || [];
        return !!choiceIds.findIndex(id => id === choice.uuid);
      }, false)
    ).map(choice => ({ ...choice, schema: 'choice' }));
  }

  const buildQuestion = (question) => {
    const { 
      choice_conditions: choiceConditionIds = [], 
      choices: choiceIds = [], 
      ..._question
    } = question;
    const choiceConditions = choiceConditionIds.map(id => fromChoiceConditions.getChoiceCondition(state.choiceConditions, id));
    const choices = choiceIds.map(id => fromChoices.getChoice(state.choices, id));
    const choiceConditionElems = choiceConditions.map((cc) => buildChoiceCondition(cc, choices));
    const choiceElems = choicesWithoutConditions(choiceConditions, choices);
    return { ..._question, choices: [ ...choiceElems, ...choiceConditionElems], schema: 'question'};
  }

  const buildGroup = (rootGroup, groups, questions) => {
    const { questions: questionIds = [], ...group } = rootGroup;
    const subGroups = groups
      .filter(group => group.parent === group.uuid)
      .map(group => buildGroup(group, groups, questions));
    const subQuestions = questions
      .filter(question => question.group === group.uuid)
      .map(question => buildQuestion(question));
    const groupElements = [...subGroups, ...subQuestions];
    return { ...group, schema: 'group', groupElements };
  }

  const rootGrp = (groups) => {
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

  const survey = fromSurveys.getSurvey(state.surveys, surveyId);
  if(!survey) {
    return null;
  }

  const { groups: groupIds = [], questions: questionIds = [], ..._survey } = survey;
  const groups = groupIds.map((id) => fromGroups.getGroup(state.groups, id));
  const questions = questionIds.map(id => fromQuestions.getQuestion(state.questions, id));
  const rootGroup = rootGrp(groups);
  console.log(rootGroup);
  const groupRoot = buildGroup(rootGroup, groups, questions);
  return { ..._survey, groupRoot };
}

