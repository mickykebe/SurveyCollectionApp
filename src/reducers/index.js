import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './auth';
import common from './common';
import surveys, * as fromSurveys from './surveys';
import languages, * as fromLanguages from './languages';
import mockData from 'mockData';

export default combineReducers({
  common,
  auth,
  surveys,
  languages,
  form: formReducer,
});

export const getAllSurveys = (state = mockData) => fromSurveys.getAllSurveys(state.surveys);
export const getAllLanguages = (state = mockData) => fromLanguages.getAllLanguages(state.languages);
export const getLanguage = (state = mockData, id) => fromLanguages.getLanguage(state.languages, id);
export const getLanguagesFromCodes = (state = mockData, codes) => fromLanguages.getLanguagesFromCodes(state.languages, codes);
export const getAllQuestionTypes = (state = mockData.questionTypes) => state.allIds.map(id => state.byId[id]);