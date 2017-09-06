export const ACTION_POPUP_MESSAGE_SET = 'POPUP_MESSAGE_SET'; 
export const ACTION_POPUP_MESSAGE_CLEAR = 'POPUP_MESSAGE_CLEAR';
export const ACTION_APP_LOAD_REQUEST = 'APP_LOAD_REQUEST';
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
export const ACTION_SURVEY_FEED_FETCH_REQUEST = 'SURVEY_FEED_FETCH_REQUEST';
export const ACTION_SURVEY_FEED_FETCH_SUCCESS = 'SURVEY_FEED_FETCH_SUCCESS';
export const ACTION_SURVEY_FEED_FETCH_FAIL = 'SURVEY_FEED_FETCH_FAIL';
export const ACTION_SURVEY_FETCH_REQUEST = 'SURVEY_FETCH_REQUEST';
export const ACTION_SURVEY_FETCH_SUCCESS = 'SURVEY_FETCH_SUCCESS';
export const ACTION_SURVEY_FETCH_FAIL = 'SURVEY_FETCH_FAIL';
export const ACTION_SURVEY_UPDATE_REQUEST = 'SURVEY_UPDATE_REQUEST';
export const ACTION_SURVEY_UPDATE_SUCCESS = 'SURVEY_UPDATE_SUCCESS';
export const ACTION_SURVEY_UPDATE_FAIL = 'SURVEY_UPDATE_FAIL';
export const ACTION_SURVEY_DELETE_REQUEST = 'SURVEY_DELETE_REQUEST';
export const ACTION_SURVEY_DELETE_SUCCESS = 'SURVEY_DELETE_SUCCESS';
export const ACTION_SURVEY_DELETE_FAIL = 'SURVEY_DELETE_FAIL';

export const apiActionCreator = 
  (actionTypes, auth = false) => 
    (apiRequest, inProgressSelector, payload = {}) => 
      (dispatch, getState) => {
        if(inProgressSelector(getState())) {
          return Promise.resolve();
        }
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
            const error = (e.response && e.response.body) || true;
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
  request: ACTION_LOGIN_REQUEST,
  success: ACTION_LOGIN_SUCCESS,
  fail: ACTION_LOGIN_FAIL,
});

export const register = apiActionCreator({
  request: ACTION_REGISTER_REQUEST,
  success: ACTION_REGISTER_SUCCESS,
  fail: ACTION_REGISTER_FAIL,
});

export const surveyCreate = apiActionCreator({
  request: ACTION_SURVEY_CREATE_REQUEST,
  success: ACTION_SURVEY_CREATE_SUCCESS,
  fail: ACTION_SURVEY_CREATE_FAIL,
}, true);

export const surveyUpdate = apiActionCreator({
  request: ACTION_SURVEY_UPDATE_REQUEST,
  success: ACTION_SURVEY_UPDATE_SUCCESS,
  fail: ACTION_SURVEY_UPDATE_FAIL,
}, true);

export const surveyFeedFetch = apiActionCreator({
  request: ACTION_SURVEY_FEED_FETCH_REQUEST,
  success: ACTION_SURVEY_FEED_FETCH_SUCCESS,
  fail: ACTION_SURVEY_FEED_FETCH_FAIL,
}, true);

export const surveyFetch = apiActionCreator({
  request: ACTION_SURVEY_FETCH_REQUEST,
  success: ACTION_SURVEY_FETCH_SUCCESS,
  fail: ACTION_SURVEY_FETCH_FAIL,
}, true);

export const surveyDelete = apiActionCreator({
  request: ACTION_SURVEY_DELETE_REQUEST,
  success: ACTION_SURVEY_DELETE_SUCCESS,
  fail: ACTION_SURVEY_DELETE_FAIL,
}, true);

export const showPopup = (message) => ({
  type: ACTION_POPUP_MESSAGE_SET,
  message,
});

export const clearPopup = () => ({
  type: ACTION_POPUP_MESSAGE_CLEAR
});

export const getCurrentUser = (token) => 
  (dispatch, getState, api) => {
    dispatch({ type: ACTION_APP_LOAD_REQUEST });
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

export const logout = () => ({
  type: ACTION_LOGOUT,
});