import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import api from './api';
import { 
  ACTION_REGISTER_SUCCESS, 
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT } from './actions';

export const localStorageMiddleware = store => next => action => {
  if(action.type === ACTION_REGISTER_SUCCESS || action.type === ACTION_LOGIN_SUCCESS) {
    next(action);
    const token = store.getState().common.token;
    window.localStorage.setItem('jwt', token);
    api.setToken(token);
    return;
  }
  
  if(action.type === ACTION_LOGOUT) {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
  }
  return next(action);
}

const getMiddleware = () => {
  const middlewares = [localStorageMiddleware, thunk.withExtraArgument(api)];

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  return applyMiddleware(...middlewares);
}

const store = createStore(
  reducers, 
  composeWithDevTools(getMiddleware())
);

export default store;