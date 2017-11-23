import { combineReducers } from 'redux';
import union from 'lodash/union';
import { 
  ACTION_PROFILE_FETCH_SUCCESS,
  ACTION_PROFILES_FETCH_SUCCESS,
  ACTION_LOGOUT
} from '../actions/types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_PROFILES_FETCH_SUCCESS:
    case ACTION_PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.profiles,
      }
    case ACTION_LOGOUT:
      return {};
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch(action.type) {
    case ACTION_PROFILES_FETCH_SUCCESS:
      return action.response.result;
    case ACTION_PROFILE_FETCH_SUCCESS:
      return union(state, action.response.result);
    case ACTION_LOGOUT:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  ids,
});

export const getProfiles = (state) => 
  state.ids.map(id => state.byId[id]);
export const getProfile = (state, id) => state.byId[id];