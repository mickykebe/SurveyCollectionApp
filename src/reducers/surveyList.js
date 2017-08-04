import {
  SURVEYS_LOADED
} from '../actionTypes';

function survey (state = {}, action) {
  switch(action.type) {
    default:
      return state;
  }
}

function surveyList(state = {}, action) {
  switch(action.type) {
    case SURVEYS_LOADED: {
      return {
        ...state,
        surveys: action.payload.results.map((s) => survey(s, action)),
      }
    }
    default:
      return state;
  }
}

export default surveyList;
