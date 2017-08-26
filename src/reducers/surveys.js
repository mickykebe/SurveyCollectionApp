import { 
  ACTION_SURVEY_CREATE_REQUEST,
  ACTION_SURVEY_CREATE_FAIL,
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEYS_FETCH_REQUEST,
  ACTION_SURVEYS_FETCH_SUCCESS,
  ACTION_SURVEYS_FETCH_FAIL,
} from '../actions';
import { combineReducers } from 'redux';

console.log(ACTION_SURVEY_CREATE_REQUEST, ACTION_SURVEY_CREATE_SUCCESS, ACTION_SURVEY_CREATE_FAIL);

const defaultState = {
  byId: {
    "1": {
      id: 1,
      title: 'Book Survey',
      description: 'Take a survey on books',
      languages: ["1"]
    },
    "2": {
      id: 2,
      title: 'Economics Survey',
      languages: ["1", "2"]
    }
  },
  allIds: [1, 2],
}

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

const allIds = (state = [], action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
      return [
        ...state,
        action.response.result,
      ];
    case ACTION_SURVEYS_FETCH_SUCCESS:
      return [
        ...state,
        ...action.response.result,
      ];
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
  allIds,
  create: asyncStatus(ACTION_SURVEY_CREATE_REQUEST, ACTION_SURVEY_CREATE_SUCCESS, ACTION_SURVEY_CREATE_FAIL),
  fetch: asyncStatus(ACTION_SURVEYS_FETCH_REQUEST, ACTION_SURVEYS_FETCH_SUCCESS, ACTION_SURVEYS_FETCH_FAIL),
});

export const getAllSurveys = (state) =>
  state.allIds.map(id => state.byId[id]);
export const getIsCreatingSurvey = (state) =>
  state.create.inProgress;
export const getSurveyCreateErrors = (state) =>
  state.create.errors;
export const getIsFetchingSurveys = (state) =>
  state.fetch.inProgress;
export const getSurveyFetchErrors = (state) => 
  state.fetch.errors;