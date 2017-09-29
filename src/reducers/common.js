import {
  ACTION_SET_CURRENT_USER,
  ACTION_LOGIN_SUCCESS,
  ACTION_REGISTER_SUCCESS,
  ACTION_LOGOUT
} from '../actions/types';

const defaultState = {
  currentUser: null,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_SET_CURRENT_USER:
      return {
        currentUser: action.user,
      };
    case ACTION_LOGOUT:
      return { currentUser: null };
    case ACTION_LOGIN_SUCCESS:
    case ACTION_REGISTER_SUCCESS:
      return {
        currentUser: action.response.user
      }
    default:
      return state;
  }
}

export const getCurrentUser = (state) => state.currentUser;