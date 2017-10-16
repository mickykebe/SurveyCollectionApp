import { 
  ACTION_REGISTER_SUCCESS, 
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT } from '../actions/types';
import { setCurrentUser } from '../actions';
import api from '../api';

export default ({ dispatch }) => next => action => {
  if(action.type === ACTION_REGISTER_SUCCESS || action.type === ACTION_LOGIN_SUCCESS) {
    const { user } = action.response;
    api.setToken(user.token);
    dispatch(setCurrentUser(user));
    window.localStorage.setItem('jwt', user.token);
    return;
  }
  
  if(action.type === ACTION_LOGOUT) {
    api.setToken(null);
    window.localStorage.setItem('jwt', '');
  }
  return next(action);
}