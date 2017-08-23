import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsAuthenticating, getIsCreatingSurvey } from 'reducers';

export const ACTION_APP_LOAD_SUCCESS = 'APP_LOAD_SUCCESS';
export const ACTION_APP_LOAD_FAIL = 'APP_LOAD_FAIL';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAIL = 'LOGIN_FAIL';
export const ACTION_REGISTER_REQUEST = 'REGISTER_REQUEST';
export const ACTION_REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ACTION_REGISTER_FAIL = 'REGISTER_FAIL';
export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_SURVEY_CREATE_REQUEST = 'SURVEY_CREATE_REQUEST';
export const ACTION_SURVEY_CREATE_SUCCESS = 'SURVEY_CREATE_SUCCESS';
export const ACTION_SURVEY_CREATE_FAIL = 'SURVEY_CREATE_FAIL';

export const getCurrentUser = (token) => 
  (dispatch, getState, api) => {
    if(token) {
      api.Auth.current().then(
        response => {
          dispatch({
            type: ACTION_APP_LOAD_SUCCESS,
            token,
            response
          });
        },
        e => {
          dispatch({
            type: ACTION_APP_LOAD_FAIL,
            error: 'Problem occurred connecting to server. Refresh and try again',
          });
        }
      )
    }
    else {
      dispatch({
        type: ACTION_APP_LOAD_SUCCESS,
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
        errors: e.response ? e.response.body : { message : 'Problem occurred connecting to server' },
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
          errors: e.response ? e.response.body : { message: 'Problem occurred connecting to server' },
        });
      }
    );
 }

 export const surveyCreate = (survey, onSuccess) =>
  (dispatch, getState, api) => {
    if(getIsCreatingSurvey(getState())) {
      return Promise.resolve();
    }
    dispatch({ type: ACTION_SURVEY_CREATE_REQUEST });
    return api.Surveys.create(survey).then(
      response => {
        dispatch({
          type: ACTION_SURVEY_CREATE_SUCCESS,
          response: normalize(response, schema.surveySchema),
        });
        onSuccess();
      },
      e => {
        console.log(e);
        dispatch({
          type: ACTION_SURVEY_CREATE_FAIL,
          errors: e.response ? e.response.body : { message: 'Problem occurred connecting to server' },
        })
      }
    );
  }

export const logout = () => ({
  type: ACTION_LOGOUT,
});