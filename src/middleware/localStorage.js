import { 
  ACTION_REGISTER_SUCCESS, 
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT } from '../actions/types';
import api from '../api';

export default store => next => action => {
  if(action.type === ACTION_REGISTER_SUCCESS || action.type === ACTION_LOGIN_SUCCESS) {
    const { token } = action.response.user;
    api.setToken(token);
    next(action);
    window.localStorage.setItem('jwt', token);
    return;
  }
  
  if(action.type === ACTION_LOGOUT) {
    api.setToken(null);
    window.localStorage.setItem('jwt', '');
  }
  return next(action);
}