import { 
  ACTION_SURVEY_CREATE_REQUEST,
  ACTION_SURVEY_CREATE_FAIL,
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEY_FEED_FETCH_REQUEST,
  ACTION_SURVEY_FEED_FETCH_SUCCESS,
  ACTION_SURVEY_FEED_FETCH_FAIL,
  ACTION_SURVEY_FETCH_REQUEST,
  ACTION_SURVEY_FETCH_SUCCESS,
  ACTION_SURVEY_FETCH_FAIL,
  ACTION_SURVEY_UPDATE_REQUEST,
  ACTION_SURVEY_UPDATE_SUCCESS,
  ACTION_SURVEY_UPDATE_FAIL,
  ACTION_SURVEY_DELETE_REQUEST,
  ACTION_SURVEY_DELETE_SUCCESS,
  ACTION_SURVEY_DELETE_FAIL,
  ACTION_RESPONSES_FETCH_SUCCESS,
} from '../actions/types';
import { combineReducers } from 'redux';
import asyncStatus from './hor/asyncStatus';
import { keyWrapState } from './hor/utils';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEY_FEED_FETCH_SUCCESS:
    case ACTION_SURVEY_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.surveys,
      };
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
      return [action.response.result, ...state]
    case ACTION_SURVEY_FEED_FETCH_SUCCESS:
      return action.response.result;
    case ACTION_SURVEY_DELETE_SUCCESS:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}

const idsByUser = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEY_FEED_FETCH_SUCCESS:
    case ACTION_SURVEY_DELETE_SUCCESS:
      return {
        ...state,
        [action.userId]: ids(state[action.userId], action),
      };
    default:
      return state;
  }
}

const responsesById = (state = {}, action) => {
  switch(action.type) {
    case ACTION_RESPONSES_FETCH_SUCCESS: {
      return {
        ...state,
        [action.survey]: action.response.result,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  idsByUser,
  responsesById,
  create: asyncStatus(ACTION_SURVEY_CREATE_REQUEST, ACTION_SURVEY_CREATE_SUCCESS, ACTION_SURVEY_CREATE_FAIL),
  fetchFeed: asyncStatus(ACTION_SURVEY_FEED_FETCH_REQUEST, ACTION_SURVEY_FEED_FETCH_SUCCESS, ACTION_SURVEY_FEED_FETCH_FAIL),
  fetch: keyWrapState(
      [ACTION_SURVEY_FETCH_REQUEST, ACTION_SURVEY_FETCH_SUCCESS, ACTION_SURVEY_FETCH_FAIL],
      action => action.id,
    )(asyncStatus),
  update: keyWrapState(
      [ACTION_SURVEY_UPDATE_REQUEST, ACTION_SURVEY_UPDATE_SUCCESS, ACTION_SURVEY_UPDATE_FAIL],
      action => action.id,
    )(asyncStatus),
  delete: keyWrapState(
      [ACTION_SURVEY_DELETE_REQUEST, ACTION_SURVEY_DELETE_SUCCESS, ACTION_SURVEY_DELETE_FAIL],
      action => action.id,
    )(asyncStatus),
});

export const getSurvey = (state, id) => {
  return state.byId[id];
}
export const getUserSurveys = (state, userId) => {
  const ids = state.idsByUser[userId] || [];
  return ids.map(id => state.byId[id]);
}
export const getSurveyResponseIds = (state, id) => {
  return state.responsesById[id] || [];
}
export const getIsCreatingSurvey = (state) =>
  state.create.inProgress;
export const getSurveyCreateErrors = (state) =>
  state.create.errors;
export const getIsFetchingSurveyFeed = (state) =>
  state.fetchFeed.inProgress;
export const getSurveyFeedFetchErrors = (state) => 
  state.fetchFeed.errors;
export const getIsFetchingSurvey = (state, id) =>
  !!(state.fetch[id] && state.fetch[id].inProgress);
export const getSurveyFetchErrors = (state, id) =>
  (state.fetch[id] && state.fetch[id].errors) || null;
export const getIsUpdatingSurvey = (state, id) =>
  !!(state.update[id] && state.update[id].inProgress);
export const getIsDeletingSurvey = (state, id) =>
  !!(state.delete[id] && state.delete[id].inProgress);
export const getSurveyDeleteErrors = (state, id) =>
  (state.delete[id] && state.delete[id].errors) || null;