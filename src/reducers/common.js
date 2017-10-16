import {
  ACTION_SET_CURRENT_USER,
  ACTION_APP_DATA_LOAD_REQUEST,
  ACTION_APP_DATA_LOAD_SUCCESS,
  ACTION_APP_DATA_LOAD_FAIL,
  ACTION_LOGOUT
} from '../actions/types';

const defaultState = {
  currentUser: null,
  appDataLoaded: false,
  appDataLoading: false,
  appDataLoadError: false,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case ACTION_LOGOUT:
      return { ...state, currentUser: null };
    case ACTION_APP_DATA_LOAD_REQUEST:
      return {
        ...state,
        appDataLoaded: false,
        appDataLoading: true,
        appDataLoadError: false,
      }
    case ACTION_APP_DATA_LOAD_SUCCESS:
      return {
        ...state,
        appDataLoaded: true,
        appDataLoading: false,
        appDataLoadError: false,
      }
    case ACTION_APP_DATA_LOAD_FAIL:
      return {
        ...state,
        appDataLoaded: false,
        appDataLoading: false,
        appDataLoadError: true,
      }
    default:
      return state;
  }
}

export const getCurrentUser = (state) => state.currentUser;
export const getAppDataLoaded = (state) => state.appDataLoaded;
export const getAppDataLoading = (state) => state.appDataLoading;
export const getAppDataLoadError = (state) => state.appDataLoadError;