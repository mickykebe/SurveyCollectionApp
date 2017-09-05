import {
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEY_FEED_FETCH_SUCCESS,
} from '../actions';
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEY_FEED_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.questions,
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
});

export const getQuestion = (state, id) =>
  state.byId[id];