import {
  ASYNC_START,
  ASYNC_END,
  REGISTER,
  LOGIN,
  LOGOUT,
  NETWORK_ERROR
} from './actionTypes';
import api from './api';

const isPromise = (p) => {
  return p && typeof p.then === 'function';
}

export const promiseMiddleware = store => next => action => {
  if(isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });
    const currentViewCount = store.getState().common.viewChangeCounter;
    const skipTracking = action.skipTracking;

    store.dispatch({ type: NETWORK_ERROR, error: false});
    action.payload.then(
      res => {
        const { viewChangeCounter } = store.getState().common;
        if(!skipTracking && viewChangeCounter !== currentViewCount) {
          return;
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const { viewChangeCounter } = store.getState().common;
        if(!skipTracking && viewChangeCounter !== currentViewCount) {
          return;
        }
        console.log('ERROR', error);
        action.error = true;
        if(!error.response) {
          store.dispatch({ type: NETWORK_ERROR, error: true });
        }
        action.payload = error.response ? error.response.body : {};
        if(!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }
  next(action);
}

export const localStorageMiddleware = store => next => action => {
  if(action.type === REGISTER || action.type === LOGIN) {
    if(!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      api.setToken(action.payload.user.token);
    }
  } else if(action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
  }

  next(action);
}