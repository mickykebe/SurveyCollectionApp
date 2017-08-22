import { getIsAuthenticating } from 'reducers';

export const ACTION_APP_LOADED = 'APP_LOADED';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAIL = 'LOGIN_FAIL';
export const ACTION_REGISTER_REQUEST = 'REGISTER_REQUEST';
export const ACTION_REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ACTION_REGISTER_FAIL = 'REGISTER_FAIL';
export const ACTION_LOGOUT = 'LOGOUT';

export const getCurrentUser = (token) => 
  (dispatch, getState, api) => {
    if(token) {
      api.Auth.current().then(
        response => {
          dispatch({
            type: ACTION_APP_LOADED,
            token,
            response
          });
        },
        e => {
          dispatch({
            type: ACTION_APP_LOADED,
            token,
          });
        }
      )
    }
    else {
      dispatch({
        type: ACTION_APP_LOADED,
      });
    }
  }

export const login = (username, password) => (dispatch, getState, api) => {
  if(getIsAuthenticating(getState())) {
    return Promise.resolve();
  }
  dispatch({ type: ACTION_LOGIN_REQUEST });
  return api.Auth.login(username, password).then(
    response => {
      dispatch({
        type: ACTION_LOGIN_SUCCESS,
        response,
      });
    },
    e => {
      dispatch({
        type: ACTION_LOGIN_FAIL,
        errors: e.response ? e.response.body : { message : 'Something went wrong' },
      });
    }
  );
};

export const register = (username, first_name, last_name, email, password, confirm_password) => 
  (dispatch, getState, api) => {
    if(getIsAuthenticating(getState())) {
      return Promise.resolve();
    }
    dispatch({ type: ACTION_REGISTER_REQUEST });
    return api.Auth.register(username, first_name, last_name, email, password, confirm_password).then(
      response => {
        dispatch({
          type: ACTION_REGISTER_SUCCESS,
          response,
        });
      },
      e => {
        dispatch({
          type: ACTION_REGISTER_FAIL,
          errors: e.response ? e.response.body : { message: 'Something went wrong' },
        });
      }
    );
 }

export const logout = () => ({
  type: ACTION_LOGOUT,
});