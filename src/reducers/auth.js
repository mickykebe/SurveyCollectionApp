import { 
  ACTION_LOGIN_REQUEST, 
  ACTION_LOGIN_SUCCESS, 
  ACTION_LOGIN_FAIL,
  ACTION_REGISTER_REQUEST,
  ACTION_REGISTER_SUCCESS,
  ACTION_REGISTER_FAIL } from '../actions';

const defaultState = {
  isAuthenticating: false,
  errors: null,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_LOGIN_SUCCESS:
    case ACTION_REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        errors: null,
      };
    }
    case ACTION_LOGIN_FAIL:
    case ACTION_REGISTER_FAIL: {
      return {
        ...state,
        isAuthenticating: false,
        errors: action.errors,
      };
    }
    case ACTION_LOGIN_REQUEST:
    case ACTION_REGISTER_REQUEST: {
        return {
          ...state,
          isAuthenticating: true,
          errors: null,
        };
      }
      return state;
    default:
      return state;
  }
}

export const getIsAuthenticating = (state) => state.isAuthenticating;
export const getAuthErrors = (state) => state.errors;