import {
  ASYNC_START,
  REGISTER,
  LOGIN,
  LOGIN_UNLOAD,
  REGISTER_UNLOAD
} from '../actionTypes';

const defaultState = {
  inProgress: false,
  errors: null,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case REGISTER:
    case LOGIN: {
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload : null,
      };
    }
    case ASYNC_START: {
      if(action.subtype === LOGIN || action.subtype === REGISTER) {
        return {
          ...state,
          inProgress: true,
        };
      }
      return state;
    }
    case LOGIN_UNLOAD:
    case REGISTER_UNLOAD: {
      return defaultState
    }
    default:
      return state;
  }
}