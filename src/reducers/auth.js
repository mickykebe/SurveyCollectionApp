import { combineReducers } from 'redux';
import { 
  ACTION_LOGIN_REQUEST, 
  ACTION_LOGIN_SUCCESS, 
  ACTION_LOGIN_FAIL,
  ACTION_REGISTER_REQUEST,
  ACTION_REGISTER_SUCCESS,
  ACTION_REGISTER_FAIL,
  ACTION_ADMIN_REGISTER_REQUEST,
  ACTION_ADMIN_REGISTER_SUCCESS,
  ACTION_ADMIN_REGISTER_FAIL } from '../actions/types';
import asyncStatus from './hor/asyncStatus';

export default combineReducers({
  login: asyncStatus(ACTION_LOGIN_REQUEST, ACTION_LOGIN_SUCCESS, ACTION_LOGIN_FAIL),
  register: asyncStatus(ACTION_REGISTER_REQUEST, ACTION_REGISTER_SUCCESS, ACTION_REGISTER_FAIL),
  registerAdmin: asyncStatus(ACTION_ADMIN_REGISTER_REQUEST, ACTION_ADMIN_REGISTER_SUCCESS, ACTION_ADMIN_REGISTER_FAIL),
});

export const getIsAuthenticating = (state) => state.login.inProgress || state.register.inProgress || state.registerAdmin.inProgress;
export const getLoginErrors = (state) => state.login.errors;
export const getRegisterErrors = (state) => state.register.errors;
export const getRegisterAdminErrors = (state) => state.registerAdmin.errors;