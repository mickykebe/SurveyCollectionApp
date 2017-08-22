import {
  ACTION_APP_LOADED,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAIL,
  ACTION_REGISTER_SUCCESS,
  ACTION_REGISTER_FAIL,
  ACTION_LOGOUT
} from '../actions';

const defaultState = {
  token: null,
  appLoaded: false,
  currentUser: null,
  networkError: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_APP_LOADED:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.response ? action.response.user : null,
      };
    case ACTION_LOGOUT:
      return { ...state, token: null, currentUser: null };
    case ACTION_LOGIN_SUCCESS:
    case ACTION_REGISTER_SUCCESS:
      return {
        ...state,
        redirectTo: '/',
        token: action.response.user.token,
        currentUser: action.response.user
      }
    default:
      return state;
  }
}

export const getCurrentUser = (state) => state.currentUser;