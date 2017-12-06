import {
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS,
  ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS,
  ACTION_SURVEY_FETCH_SUCCESS,
  ACTION_SURVEY_UPDATE_SUCCESS,
} from '../actions/types';
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS:
    case ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS:
    case ACTION_SURVEY_FETCH_SUCCESS:
    case ACTION_SURVEY_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.choices,
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
});

export const getChoice = (state, id) =>
  state.byId[id];
export const getMap = (state) =>
  state.byId;