import { 
  ACTION_SURVEY_CREATE_REQUEST,
  ACTION_SURVEY_CREATE_FAIL,
  ACTION_SURVEY_CREATE_SUCCESS 
} from '../actions';
import { combineReducers } from 'redux';

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

const byId = (state = defaultState.byId, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.surveys,
      };
    default:
      return state;
  }
}

const allIds = (state = defaultState.allIds, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
      return [
        ...state,
        action.response.result,
      ];
    default:
      return state;
  }
}

const isCreatingSurvey = (state = false, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_REQUEST:
      return true;
    case ACTION_SURVEY_CREATE_SUCCESS:
      return false;
    case ACTION_SURVEY_CREATE_FAIL:
      return false;
    default:
      return state;
  }
}

const errors = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_FAIL:
      return action.errors;
    case ACTION_SURVEY_CREATE_REQUEST:
    case ACTION_SURVEY_CREATE_SUCCESS:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
  isCreatingSurvey,
  errors,
});

export const getAllSurveys = (state) =>
  state.allIds.map(id => state.byId[id]);
export const getIsCreatingSurvey = (state) =>
  state.isCreatingSurvey;
export const getSurveyCreateErrors = (state) =>
  state.errors;