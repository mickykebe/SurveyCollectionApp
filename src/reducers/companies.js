import { combineReducers } from 'redux';
import {
  ACTION_COMPANIES_FETCH_REQUEST,
  ACTION_COMPANIES_FETCH_SUCCESS,
  ACTION_COMPANIES_FETCH_FAIL,
} from '../actions/types';
import asyncStatus from './hor/asyncStatus';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_COMPANIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.companies,
      }
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch(action.type) {
    case ACTION_COMPANIES_FETCH_SUCCESS:
      return action.response.result;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  ids,
  feedFetch: asyncStatus(ACTION_COMPANIES_FETCH_REQUEST, ACTION_COMPANIES_FETCH_SUCCESS, ACTION_COMPANIES_FETCH_FAIL),
});

export const getIsFetchingCompanies = (state) => state.feedFetch.inProgress;
export const getCompaniesFetchError = (state) => state.feedFetch.errors;
export const getAllCompanies = (state) => state.ids.map(id => state.byId[id]);
export const getCompany = (state, id) => state.byId[id];