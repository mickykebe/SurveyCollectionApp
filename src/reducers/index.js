import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './auth';
import common from './common';
import surveys, * as fromSurveys from './surveys';
import languages, * as fromLanguages from './languages';
import questionTypes, * as fromQuestionTypes from './questionTypes';
import operators, * as fromOperators from './operators';
import mockData from 'mockData';

export default combineReducers({
  common,
  auth,
  surveys,
  languages,
  questionTypes,
  operators,
  form: formReducer,
});

export const getAllSurveys = (state = mockData) => 
  fromSurveys.getAllSurveys(state.surveys);
export const getAllLanguages = (state = mockData) => 
  fromLanguages.getAllLanguages(state.languages);
export const getLanguage = (state = mockData, id) => 
  fromLanguages.getLanguage(state.languages, id);
export const getLanguagesFromCodes = (state = mockData, codes) => 
  fromLanguages.getLanguagesFromCodes(state.languages, codes);
export const getAllQuestionTypes = (state) => 
  fromQuestionTypes.getAllQuestionTypes(state.questionTypes);
export const getOperators = (state, type = fromOperators.OPERATOR_TYPE_ALL) =>
  fromOperators.getOperators(state.operators, type);
export const getQuestionTypeOperators = (state, id) => {
  const operatorCodes = fromQuestionTypes.getQuestionTypeOperators(state.questionTypes, id);
  return operatorCodes.map(code => fromOperators.getOperator(state.operators, code));
}