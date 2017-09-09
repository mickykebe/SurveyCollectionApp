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
} from '../actions';
import { combineReducers } from 'redux';

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

const asyncStatus = (actionRequest, actionSuccess, actionFail) => 
  (state = {
    inProgress: false,
    errors: null,
  }, action) => {
    switch(action.type) {
      case actionRequest:
        return {
          inProgress: true,
          errors: null
        };
      case actionSuccess:
        return {
          inProgress: false,
          errors: null,
        };
      case actionFail:
        return {
          inProgress: false,
          errors: action.errors
        }
      default:
        return state;
    }
  }

export default combineReducers({
  byId,
  idsByUser,
  create: asyncStatus(ACTION_SURVEY_CREATE_REQUEST, ACTION_SURVEY_CREATE_SUCCESS, ACTION_SURVEY_CREATE_FAIL),
  fetchFeed: asyncStatus(ACTION_SURVEY_FEED_FETCH_REQUEST, ACTION_SURVEY_FEED_FETCH_SUCCESS, ACTION_SURVEY_FEED_FETCH_FAIL),
  fetch: asyncStatus(ACTION_SURVEY_FETCH_REQUEST, ACTION_SURVEY_FETCH_SUCCESS, ACTION_SURVEY_FETCH_FAIL),
  update: asyncStatus(ACTION_SURVEY_UPDATE_REQUEST, ACTION_SURVEY_UPDATE_SUCCESS, ACTION_SURVEY_UPDATE_FAIL),
  delete: asyncStatus(ACTION_SURVEY_DELETE_REQUEST, ACTION_SURVEY_DELETE_SUCCESS, ACTION_SURVEY_DELETE_FAIL),
});

export const getSurvey = (state, id) => {
  return state.byId[id];
}
export const getUserSurveys = (state, userId) => {
  const ids = state.idsByUser[userId] || [];
  return ids.map(id => state.byId[id]);
}
export const getIsCreatingSurvey = (state) =>
  state.create.inProgress;
export const getSurveyCreateErrors = (state) =>
  state.create.errors;
export const getIsFetchingSurveyFeed = (state) =>
  state.fetchFeed.inProgress;
export const getSurveyFeedFetchErrors = (state) => 
  state.fetchFeed.errors;
export const getIsFetchingSurvey = (state) =>
  state.fetch.inProgress;
export const getSurveyFetchErrors = (state) =>
  state.fetch.errors;
export const getIsUpdatingSurvey = (state) =>
  state.update.inProgress;
export const getIsDeletingSurvey = (state) =>
  state.delete.inProgress;
export const getSurveyDeleteErrors = (state) =>
  state.delete.errors;