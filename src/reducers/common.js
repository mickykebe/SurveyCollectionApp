import {
  APP_LOAD,
  REDIRECT_TO,
  REDIRECT_DONE,
  LOGIN,
  LOGOUT,
  REGISTER,
  NETWORK_ERROR,
  REGISTER_UNLOAD,
  LOGIN_UNLOAD
} from '../actionTypes';

const defaultState = {
  token: null,
  viewChangeCounter: 0,
  appLoaded: false,
  currentUser: null,
  networkError: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null,
      };
    case REDIRECT_TO:
      return { ...state, redirectTo: action.path }
    case REDIRECT_DONE:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      }
    case NETWORK_ERROR: {
      return {
        ...state,
        networkError: action.error,
      }
    }
    case LOGIN_UNLOAD:
    case REGISTER_UNLOAD:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 }
    default:
      return state;
  }
}