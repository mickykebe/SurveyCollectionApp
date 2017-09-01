import { 
  ACTION_SURVEY_CREATE_REQUEST,
  ACTION_SURVEY_CREATE_FAIL,
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEYS_FETCH_REQUEST,
  ACTION_SURVEYS_FETCH_SUCCESS,
  ACTION_SURVEYS_FETCH_FAIL,
} from '../actions';
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEYS_FETCH_SUCCESS:
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
      return [...state, action.response.result]
    case ACTION_SURVEYS_FETCH_SUCCESS:
      return [
        ...state,
        ...action.response.result,
      ];
    default:
      return state;
  }
}

const idsByUser = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEYS_FETCH_SUCCESS:
      return {
        ...state,
        [action.userId]: ids(state.userId, action),
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
  fetch: asyncStatus(ACTION_SURVEYS_FETCH_REQUEST, ACTION_SURVEYS_FETCH_SUCCESS, ACTION_SURVEYS_FETCH_FAIL),
});

export const getUserSurveys = (state, userId) => {
  const ids = state.idsByUser[userId] || [];
  return ids.map(id => state.byId[id]);
}
export const getIsCreatingSurvey = (state) =>
  state.create.inProgress;
export const getSurveyCreateErrors = (state) =>
  state.create.errors;
export const getIsFetchingSurveys = (state) =>
  state.fetch.inProgress;
export const getSurveyFetchErrors = (state) => 
  state.fetch.errors;