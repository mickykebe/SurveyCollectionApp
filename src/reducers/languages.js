import { combineReducers } from 'redux';
import {
  ACTION_LANGUAGE_FEED_FETCH_REQUEST,
  ACTION_LANGUAGE_FEED_FETCH_SUCCESS,
  ACTION_LANGUAGE_FEED_FETCH_FAIL,
  ACTION_LANGUAGE_CREATE_SUCCESS,
} from '../actions/types';
import asyncStatus from './hor/asyncStatus';

const byCode = (state = {}, action) => {
  switch(action.type) {
    case ACTION_LANGUAGE_FEED_FETCH_SUCCESS:
    case ACTION_LANGUAGE_CREATE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.languages,
      };
    default:
      return state;
  }
}

const codes = (state = [], action) => {
  switch (action.type) {
    case ACTION_LANGUAGE_FEED_FETCH_SUCCESS:
      return action.response.result;
    case ACTION_LANGUAGE_CREATE_SUCCESS:
      return [...state, action.response.result];
    default:
      return state;
  }
}

export default combineReducers({
  byCode,
  codes,
  fetchStatus: asyncStatus(ACTION_LANGUAGE_FEED_FETCH_REQUEST, ACTION_LANGUAGE_FEED_FETCH_SUCCESS, ACTION_LANGUAGE_FEED_FETCH_FAIL),
});

export const getAllLanguages = (state) =>
  state.codes.map(code => state.byCode[code]);
export const getLanguage = (state, code) => 
  state.byCode[code.toLowerCase()];
export const getLanguagesFromCodes = (state, codes) =>
  getAllLanguages(state).filter(lang => codes.indexOf(lang.code) > -1);
export const getIsFetchingLanguages = (state) =>
  state.fetchStatus.inProgress;
export const getLanguagesFetchErrors = (state) =>
  state.fetchStatus.errors;