import { combineReducers } from 'redux';
import union from 'lodash/union';
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
import asyncStatus from './hor/asyncStatus';
import pagination from './hor/pagination';
import { createKeyWrappedReducer } from './hor/utils';

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
      return union(state, action.response.result);
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
        [action.survey]: union(state[action.survey], action.response.result),
      };
    }
    default:
      return state;
  }
}

const feed = combineReducers({
  status: asyncStatus(ACTION_SURVEY_FEED_FETCH_REQUEST, ACTION_SURVEY_FEED_FETCH_SUCCESS, ACTION_SURVEY_FEED_FETCH_FAIL),
  pagination: pagination(ACTION_SURVEY_FEED_FETCH_SUCCESS),
});

export default combineReducers({
  byId,
  idsByUser,
  responsesById,
  feed,
  create: asyncStatus(ACTION_SURVEY_CREATE_REQUEST, ACTION_SURVEY_CREATE_SUCCESS, ACTION_SURVEY_CREATE_FAIL),
  fetch: createKeyWrappedReducer(
      action => action.id,
    )(asyncStatus(ACTION_SURVEY_FETCH_REQUEST, ACTION_SURVEY_FETCH_SUCCESS, ACTION_SURVEY_FETCH_FAIL)),
  update: createKeyWrappedReducer(
      action => action.id,
    )(asyncStatus(ACTION_SURVEY_UPDATE_REQUEST, ACTION_SURVEY_UPDATE_SUCCESS, ACTION_SURVEY_UPDATE_FAIL)),
  delete: createKeyWrappedReducer(
      action => action.id,
    )(asyncStatus(ACTION_SURVEY_DELETE_REQUEST, ACTION_SURVEY_DELETE_SUCCESS, ACTION_SURVEY_DELETE_FAIL)),
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
export const getIsFetchingSurveyFeed = (state) =>
  state.feed.status.inProgress;
export const getSurveyFeedFetchErrors = (state) => 
  state.feed.status.errors;
export const getSurveyFeedCount = (state) =>
  state.feed.pagination.count;
export const getSurveyFeedNext = (state) =>
  state.feed.pagination.next;
export const getIsCreatingSurvey = (state) =>
  state.create.inProgress;
export const getSurveyCreateErrors = (state) =>
  state.create.errors;
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