import { combineReducers } from "redux";
import { denormalize } from "normalizr";
import { surveySchema } from "../middleware/normalizer/schema";
import surveyForm, * as fromSurveyForm from "./surveyForm";
import auth, * as fromAuth from "./auth";
import common, * as fromCommon from "./common";
import companies, * as fromCompanies from "./companies";
import currencies, * as fromCurrencies from "./currencies";
import profiles, * as fromProfiles from "./profiles";
import surveys, * as fromSurveys from "./surveys";
import responses, * as fromResponses from "./responses";
import questions, * as fromQuestions from "./questions";
import groups, * as fromGroups from "./groups";
import choices, * as fromChoices from "./choices";
import choiceConditions, * as fromChoiceConditions from "./choiceConditions";
import languages, * as fromLanguages from "./languages";
import questionTypes, * as fromQuestionTypes from "./questionTypes";
import operators, * as fromOperators from "./operators";
import ui, * as fromUi from "./ui";

export default combineReducers({
  common,
  auth,
  companies,
  currencies,
  profiles,
  surveys,
  responses,
  questions,
  groups,
  choices,
  choiceConditions,
  languages,
  questionTypes,
  operators,
  ui,
  form: surveyForm
});

//Common selectors
export const getCurrentUser = state => fromCommon.getCurrentUser(state.common);
export const getIsCommonDataLoaded = state =>
  fromCommon.getIsCommonDataLoaded(state.common);

//Auth selectors
export const getIsAuthenticating = state =>
  fromAuth.getIsAuthenticating(state.auth);
export const getLoginErrors = state => fromAuth.getLoginErrors(state.auth);
export const getRegisterErrors = state =>
  fromAuth.getRegisterErrors(state.auth);
export const getRegisterAdminErrors = state =>
  fromAuth.getRegisterAdminErrors(state.auth);

//Company selectors
export const getIsFetchingCompanies = state =>
  fromCompanies.getIsFetchingCompanies(state.companies);
export const getCompaniesFetchError = state =>
  fromCompanies.getCompaniesFetchError(state.companies);
export const getAllCompanies = state =>
  fromCompanies.getAllCompanies(state.companies);
export const getCompany = (state, id) => fromCompanies.getCompany(state, id);

//Currency selectors
export const getCurrencies = state =>
  fromCurrencies.getCurrencies(state.currencies);

//Profile selectors
export const getProfiles = state => fromProfiles.getProfiles(state.profiles);
export const getProfile = (state, id) =>
  fromProfiles.getProfile(state.profiles, id);

//Form selectors
export const getElementFromClipboard = state =>
  fromSurveyForm.getElementFromClipboard(state.form);

//Survey selectors
export const getSurvey = (state, id) =>
  fromSurveys.getSurvey(state.surveys, id);
export const getSurveys = (state, active) =>
  fromSurveys.getSurveys(state.surveys, active);
export const getIsCreatingSurvey = state =>
  fromSurveys.getIsCreatingSurvey(state.surveys);
export const getSurveyCreateErrors = state =>
  fromSurveys.getSurveyCreateErrors(state.surveys);
export const getIsFetchingSurveys = (state, active) =>
  fromSurveys.getIsFetchingSurveys(state.surveys, active);
export const getSurveysFetchErrors = (state, active) =>
  fromSurveys.getSurveysFetchErrors(state.surveys, active);
export const getSurveysCount = (state, active) =>
  fromSurveys.getSurveysCount(state.surveys, active);
export const getSurveysNext = (state, active) =>
  fromSurveys.getSurveysNext(state.surveys, active);
export const getIsFetchingSurvey = (state, id) =>
  fromSurveys.getIsFetchingSurvey(state.surveys, id);
export const getSurveyFetchErrors = (state, id) =>
  fromSurveys.getSurveyFetchErrors(state.surveys, id);
export const getIsUpdatingSurvey = (state, id) =>
  fromSurveys.getIsUpdatingSurvey(state.surveys, id);
export const getIsDeletingSurvey = (state, id) =>
  fromSurveys.getIsDeletingSurvey(state.surveys, id);
export const getSurveyDeleteErrors = (state, id) =>
  fromSurveys.getSurveyDeleteErrors(state.surveys, id);
export const getDenormalizedSurvey = (state, id) =>
  denormalize(fromSurveys.getSurvey(state.surveys, id), surveySchema, {
    groups: fromGroups.getMap(state.groups),
    questions: fromQuestions.getMap(state.questions),
    choices: fromChoices.getMap(state.choices),
    choice_conditions: fromChoiceConditions.getMap(state.choiceConditions)
  });

//Response selectors
export const getSurveyResponse = (state, id) =>
  fromResponses.getSurveyResponse(state.responses, id);
export const getIsFetchingSurveyResponses = (state, surveyId) =>
  fromResponses.getIsFetchingSurveyResponses(state.responses, surveyId);
export const getSurveyResponsesFetchErrors = (state, surveyId) =>
  fromResponses.getSurveyResponsesFetchErrors(state.responses, surveyId);
export const getSurveyResponsesCount = (state, surveyId) =>
  fromResponses.getSurveyResponsesCount(state.responses, surveyId);
export const getSurveyResponsesNext = (state, surveyId) =>
  fromResponses.getSurveyResponsesNext(state.responses, surveyId);
export const getSurveyResponseAnswer = (state, responseId, questionId) =>
  fromResponses.getSurveyResponseAnswer(
    state.responses,
    responseId,
    questionId
  );

//Question selectors
export const getQuestion = (state, id) =>
  fromQuestions.getQuestion(state.questions, id);

//Group selectors
export const getGroup = (state, id) => fromGroups.getGroup(state.groups, id);

//Choice selectors
export const getChoice = (state, id) => {
  return fromChoices.getChoice(state.choices, id);
};

//Choice condition selectors
export const getChoiceConditions = (state, id) =>
  fromChoiceConditions.getChoiceCondition(state.choiceConditions, id);

//Language selectors
export const getAllLanguages = state =>
  fromLanguages.getAllLanguages(state.languages);
export const getLanguage = (state, code) =>
  fromLanguages.getLanguage(state.languages, code);
export const getLanguagesFromCodes = (state, codes) =>
  fromLanguages.getLanguagesFromCodes(state.languages, codes);
export const getIsFetchingLanguages = state =>
  fromLanguages.getIsFetchingLanguages(state.languages);
export const getLanguagesFetchErrors = state =>
  fromLanguages.getLanguagesFetchErrors(state.languages);

//Question type selectors
export const getAllQuestionTypes = state =>
  fromQuestionTypes.getAllQuestionTypes(state.questionTypes);
export const getQuestionType = (state, id) =>
  fromQuestionTypes.getQuestionType(state.questionTypes, id);

//Operator selectors
export const getOperators = (
  state,
  opCodes = fromOperators.OPERATOR_CODES_ALL
) => fromOperators.getOperators(state.operators, opCodes);

//Ui selectors
export const getPopupMessage = state => fromUi.getPopupMessage(state.ui);

//Cross selectors
export const getQuestionTypeOperators = (state, id) => {
  const operatorCodes = fromQuestionTypes.getQuestionTypeOperators(
    state.questionTypes,
    id
  );
  return operatorCodes.map(code =>
    fromOperators.getOperator(state.operators, code)
  );
};

export const getSurveyResponses = (state, id) => {
  const responseIds = fromSurveys.getSurveyResponseIds(state.surveys, id);
  return responseIds.map(resId =>
    fromResponses.getSurveyResponse(state.responses, resId)
  );
};

export const getQuestionChoices = (state, qId) => {
  const choiceIds = fromQuestions.getQuestion(state.questions, qId);
  return choiceIds.map(cId => fromChoices.getChoice(state.choices, cId));
};

export const getSurveyQuestions = (state, surveyId) => {
  const survey = fromSurveys.getSurvey(state.surveys, surveyId) || {};
  const { questions: questionIds = [] } = survey;
  return questionIds.map(questionId =>
    fromQuestions.getQuestion(state.questions, questionId)
  );
};

export const getResponseTableQuestions = (state, surveyId) => {
  const questions = getSurveyQuestions(state, surveyId);
  return questions.filter(
    question => getQuestionType(state, question.type).tableDisplay
  );
};

export const getSurveyFormData = (state, surveyId) => {
  const buildChoiceCondition = (choiceCondition, choices) => {
    const { choices: choiceIds = [], ..._choiceCondition } = choiceCondition;
    const _choices = choiceIds
      .map(id => fromChoices.getChoice(state.choices, id))
      .map(choice => ({ schema: "choice", ...choice }));
    return {
      ..._choiceCondition,
      choices: _choices,
      schema: "choice_condition"
    };
  };

  const choicesWithoutConditions = (choiceConditions, choices) => {
    return choices
      .filter(
        choice =>
          !choiceConditions.reduce((found, condition) => {
            if (found) return true;
            const choiceIds = condition.choices || [];
            return choiceIds.findIndex(id => id === choice.uuid) !== -1;
          }, false)
      )
      .map(choice => ({ ...choice, schema: "choice" }));
  };

  const buildQuestion = question => {
    const {
      choice_conditions: choiceConditionIds = [],
      choices: choiceIds = [],
      ..._question
    } = question;
    const choiceConditions = choiceConditionIds.map(id =>
      fromChoiceConditions.getChoiceCondition(state.choiceConditions, id)
    );
    const choices = choiceIds.map(id =>
      fromChoices.getChoice(state.choices, id)
    );
    const choiceConditionElems = choiceConditions.map(cc =>
      buildChoiceCondition(cc, choices)
    );
    const choiceElems = choicesWithoutConditions(choiceConditions, choices);
    return {
      ..._question,
      choices: [...choiceElems, ...choiceConditionElems],
      schema: "question"
    };
  };

  const buildGroup = (rootGroup, groups, questions) => {
    const { questions: questionIds = [], ...group } = rootGroup;
    const subGroups = groups
      .filter(g => g.parent === group.uuid)
      .map(group => buildGroup(group, groups, questions));
    const subQuestions = questions
      .filter(question => question.group === group.uuid)
      .map(question => buildQuestion(question));
    const unsorted = [...subGroups, ...subQuestions];
    const groupElements = unsorted
      .slice()
      .sort((e1, e2) => e1.index - e2.index);
    return { ...group, schema: "group", groupElements };
  };

  const rootGrp = groups => {
    return groups.reduce((rootGroup, currentGroup) => {
      if (!!rootGroup) {
        return rootGroup;
      }
      if (currentGroup.root) {
        return currentGroup;
      }
      return null;
    }, null);
  };

  const survey = fromSurveys.getSurvey(state.surveys, surveyId);
  if (!survey) {
    return null;
  }

  const {
    groups: groupIds = [],
    questions: questionIds = [],
    ..._survey
  } = survey;
  const groups = groupIds.map(id => fromGroups.getGroup(state.groups, id));
  const questions = questionIds.map(id =>
    fromQuestions.getQuestion(state.questions, id)
  );
  const rootGroup = rootGrp(groups);
  const groupRoot = buildGroup(rootGroup, groups, questions);
  return { ..._survey, groupRoot };
};
