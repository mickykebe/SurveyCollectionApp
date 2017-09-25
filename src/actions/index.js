import * as actionTypes from './types';

export const apiActionCreator = 
  (actionTypes, auth = false) => 
    (apiRequest, payload = {}) => 
      (dispatch, getState) => {
        dispatch({ 
          type: actionTypes.request, 
          auth,
          ...payload
        });
        return apiRequest.then(
          response => {
            dispatch({
              type: actionTypes.success,
              auth,
              response,
              ...payload,
            });
          }, e => {
            const error = (e.response && e.response.body) || { network_error: 'Problem connecting to server' };
            dispatch({
              type: actionTypes.fail,
              errors: error,
              auth,
              ...payload
            });
            return Promise.reject(error);
          }
        )
      }

export const login = apiActionCreator({
  request: actionTypes.ACTION_LOGIN_REQUEST,
  success: actionTypes.ACTION_LOGIN_SUCCESS,
  fail: actionTypes.ACTION_LOGIN_FAIL,
});

export const register = apiActionCreator({
  request: actionTypes.ACTION_REGISTER_REQUEST,
  success: actionTypes.ACTION_REGISTER_SUCCESS,
  fail: actionTypes.ACTION_REGISTER_FAIL,
});

export const surveyCreate = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_CREATE_REQUEST,
  success: actionTypes.ACTION_SURVEY_CREATE_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_CREATE_FAIL,
}, true);

export const surveyUpdate = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_UPDATE_REQUEST,
  success: actionTypes.ACTION_SURVEY_UPDATE_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_UPDATE_FAIL,
}, true);

export const surveyFeedFetch = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_FEED_FETCH_REQUEST,
  success: actionTypes.ACTION_SURVEY_FEED_FETCH_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_FEED_FETCH_FAIL,
}, true);

export const surveyFetch = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_FETCH_REQUEST,
  success: actionTypes.ACTION_SURVEY_FETCH_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_FETCH_FAIL,
}, true);

export const surveyDelete = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_DELETE_REQUEST,
  success: actionTypes.ACTION_SURVEY_DELETE_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_DELETE_FAIL,
}, true);

export const responsesFetch = apiActionCreator({
  request: actionTypes.ACTION_RESPONSES_FETCH_REQUEST,
  success: actionTypes.ACTION_RESPONSES_FETCH_SUCCESS,
  fail: actionTypes.ACTION_RESPONSES_FETCH_FAIL,
}, true);

export const showPopup = (message) => ({
  type: actionTypes.ACTION_POPUP_MESSAGE_SET,
  message,
});

export const clearPopup = () => ({
  type: actionTypes.ACTION_POPUP_MESSAGE_CLEAR
});

export const getCurrentUser = (token) => 
  (dispatch, getState, api) => {
    dispatch({ type: actionTypes.ACTION_APP_LOAD_REQUEST });
    if(token) {
      api.Auth.current().then(
        response => {
          dispatch({
            type: actionTypes.ACTION_APP_LOAD_SUCCESS,
            token,
            response
          });
        },
        e => {
          if(e && e.response && e.response.body && e.response.body.detail === 'Signature has expired.') {
            dispatch({
              type: actionTypes.ACTION_APP_LOAD_SUCCESS,
            });
          }
          dispatch({
            type: actionTypes.ACTION_APP_LOAD_FAIL,
            error: 'Problem occurred connecting to server. Refresh and try again',
          });
        }
      )
    }
    else {
      dispatch({
        type: actionTypes.ACTION_APP_LOAD_SUCCESS,
      });
    }
  }

export const logout = () => ({
  type: actionTypes.ACTION_LOGOUT,
});