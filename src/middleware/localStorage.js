import { 
  ACTION_REGISTER_SUCCESS, 
  ACTION_LOGIN_SUCCESS,
  ACTION_ADMIN_REGISTER_SUCCESS,
  ACTION_LOGOUT } from '../actions/types';
import { setCurrentUser } from '../actions';
import api from '../api';

export default ({ dispatch }) => next => action => {
  switch(action.type) {
    case ACTION_LOGIN_SUCCESS:
    case ACTION_REGISTER_SUCCESS:
    case ACTION_ADMIN_REGISTER_SUCCESS: {
      const { user } = action.response;
      api.setToken(user.token);
      dispatch(setCurrentUser(user));
      window.localStorage.setItem('jwt', user.token);
    }
    case ACTION_LOGOUT: {
      api.setToken(null);
      window.localStorage.setItem('jwt', '');
    }
  }
  return next(action);
}