import {
  ACTION_APP_LOAD_SUCCESS,
  ACTION_APP_LOAD_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_REGISTER_SUCCESS,
  ACTION_LOGOUT
} from '../actions';

const defaultState = {
  token: null,
  appLoaded: false,
  currentUser: null,
  appLoadError: null,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_APP_LOAD_SUCCESS:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.response ? action.response.user : null,
        appLoadError: null,
      };
    case ACTION_APP_LOAD_FAIL:
      return {
        ...state,
        appLoadError: action.error
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
export const getAppLoadError = (state) => state.appLoadError;