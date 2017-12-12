import * as actionTypes from "./types";

export const apiActionCreator = (actionTypes, auth = false) => (
  apiRequest,
  payload = {},
  resultThunk = null
) => (dispatch, getState) => {
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
        ...payload
      });
      if (resultThunk) {
        return resultThunk(getState());
      }
    },
    e => {
      const error = (e.response && e.response.body) || {
        network_error: "Problem connecting to server"
      };
      dispatch({
        type: actionTypes.fail,
        errors: error,
        auth,
        ...payload
      });
      return Promise.reject(error);
    }
  );
};

export const commonDataLoaded = () => ({
  type: actionTypes.ACTION_COMMON_DATA_LOADED
});

export const login = apiActionCreator({
  request: actionTypes.ACTION_LOGIN_REQUEST,
  success: actionTypes.ACTION_LOGIN_SUCCESS,
  fail: actionTypes.ACTION_LOGIN_FAIL
});

export const register = apiActionCreator({
  request: actionTypes.ACTION_REGISTER_REQUEST,
  success: actionTypes.ACTION_REGISTER_SUCCESS,
  fail: actionTypes.ACTION_REGISTER_FAIL
});

export const adminRegister = apiActionCreator({
  request: actionTypes.ACTION_ADMIN_REGISTER_REQUEST,
  success: actionTypes.ACTION_ADMIN_REGISTER_SUCCESS,
  fail: actionTypes.ACTION_ADMIN_REGISTER_FAIL
});

export const profilesFetchSuccess = response => ({
  type: actionTypes.ACTION_PROFILES_FETCH_SUCCESS,
  response
});

export const profileFetchSuccess = response => ({
  type: actionTypes.ACTION_PROFILE_FETCH_SUCCESS,
  response
});

export const companiesFetchSuccess = response => ({
  type: actionTypes.ACTION_COMPANIES_FETCH_SUCCESS,
  response
});

export const companiesFetch = apiActionCreator({
  request: actionTypes.ACTION_COMPANIES_FETCH_REQUEST,
  success: actionTypes.ACTION_COMPANIES_FETCH_SUCCESS,
  fail: actionTypes.ACTION_COMPANIES_FETCH_FAIL
});

export const surveyCreate = apiActionCreator(
  {
    request: actionTypes.ACTION_SURVEY_CREATE_REQUEST,
    success: actionTypes.ACTION_SURVEY_CREATE_SUCCESS,
    fail: actionTypes.ACTION_SURVEY_CREATE_FAIL
  },
  true
);

export const surveyUpdate = apiActionCreator(
  {
    request: actionTypes.ACTION_SURVEY_UPDATE_REQUEST,
    success: actionTypes.ACTION_SURVEY_UPDATE_SUCCESS,
    fail: actionTypes.ACTION_SURVEY_UPDATE_FAIL
  },
  true
);

export const surveysPendingFetch = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_PENDING_FEED_FETCH_REQUEST,
  success: actionTypes.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_PENDING_FEED_FETCH_FAIL
});

export const surveysPublishedFetch = apiActionCreator({
  request: actionTypes.ACTION_SURVEY_PUBLISHED_FEED_FETCH_REQUEST,
  success: actionTypes.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS,
  fail: actionTypes.ACTION_SURVEY_PUBLISHED_FEED_FETCH_FAIL
});

export const surveyFetch = apiActionCreator(
  {
    request: actionTypes.ACTION_SURVEY_FETCH_REQUEST,
    success: actionTypes.ACTION_SURVEY_FETCH_SUCCESS,
    fail: actionTypes.ACTION_SURVEY_FETCH_FAIL
  },
  true
);

export const surveyDelete = apiActionCreator(
  {
    request: actionTypes.ACTION_SURVEY_DELETE_REQUEST,
    success: actionTypes.ACTION_SURVEY_DELETE_SUCCESS,
    fail: actionTypes.ACTION_SURVEY_DELETE_FAIL
  },
  true
);

export const responsesFetch = apiActionCreator(
  {
    request: actionTypes.ACTION_RESPONSES_FETCH_REQUEST,
    success: actionTypes.ACTION_RESPONSES_FETCH_SUCCESS,
    fail: actionTypes.ACTION_RESPONSES_FETCH_FAIL
  },
  true
);

export const fetchLanguagesSuccess = response => ({
  type: actionTypes.ACTION_LANGUAGE_FEED_FETCH_SUCCESS,
  response
});

export const createLanguageSuccess = response => ({
  type: actionTypes.ACTION_LANGUAGE_CREATE_SUCCESS,
  response
});

export const updateLanguageSuccess = (response, prevCode) => ({
  type: actionTypes.ACTION_LANGUAGE_UPDATE_SUCCESS,
  response,
  prevCode
});

export const deleteLanguageSuccess = code => ({
  type: actionTypes.ACTION_LANGUAGE_DELETE_SUCCESS,
  code
});

export const fetchCurrenciesSuccess = response => ({
  type: actionTypes.ACTION_CURRENCIES_FETCH_SUCCESS,
  response
});

export const showPopup = message => ({
  type: actionTypes.ACTION_POPUP_MESSAGE_SET,
  message
});

export const clearPopup = () => ({
  type: actionTypes.ACTION_POPUP_MESSAGE_CLEAR
});

export const setCurrentUser = user => ({
  type: actionTypes.ACTION_SET_CURRENT_USER,
  user
});

export const logout = () => ({
  type: actionTypes.ACTION_LOGOUT
});

export const copyFormGroupElement = element => ({
  type: actionTypes.ACTION_SURVEY_FORM_COPY_ELEMENT,
  element
});

export const clearClipboard = () => ({
  type: actionTypes.ACTION_SURVEY_FORM_CLEAR_CLIPBOARD
});
