import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth, * as fromAuth from './auth';
import common, * as fromCommon from './common';
import surveys, * as fromSurveys from './surveys';
import languages, * as fromLanguages from './languages';
import questionTypes, * as fromQuestionTypes from './questionTypes';
import operators, * as fromOperators from './operators';
import ui, * as fromUi from './ui';

export default combineReducers({
  common,
  auth,
  surveys,
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
export const getAllSurveys = (state) => 
  fromSurveys.getAllSurveys(state.surveys);
export const getIsCreatingSurvey = (state) =>
  fromSurveys.getIsCreatingSurvey(state.surveys);
export const getIsFetchingSurveys = (state) =>
  fromSurveys.getIsFetchingSurveys(state.surveys);
export const getSurveyCreateErrors = (state) =>
  fromSurveys.getSurveyCreateErrors(state.surveys);
export const getSurveyFetchErrors = (state) =>
  fromSurveys.getSurveyFetchErrors(state.surveys);

//Language selectors
export const getAllLanguages = (state) => 
  fromLanguages.getAllLanguages(state.languages);
export const getLanguage = (state, id) => 
  fromLanguages.getLanguage(state.languages, id);
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