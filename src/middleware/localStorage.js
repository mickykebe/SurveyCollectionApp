import { 
  ACTION_REGISTER_SUCCESS, 
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT } from '../actions';
import api from '../api';

export default store => next => action => {
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