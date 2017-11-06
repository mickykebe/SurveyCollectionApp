import {
  ACTION_SET_CURRENT_USER,
  ACTION_APP_DATA_LOAD_REQUEST,
  ACTION_APP_DATA_LOAD_SUCCESS,
  ACTION_APP_DATA_LOAD_FAIL,
  ACTION_LOGOUT
} from '../actions/types';

const defaultState = {
  currentUser: null,
  appDataLoading: false,
  appDataLoaded: false,
  appDataLoadError: true,
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
        appDataLoading: true,
        appDataLoaded: false,
        appDataLoadError: null,
      }
    case ACTION_APP_DATA_LOAD_SUCCESS:
      return {
        ...state,
        appDataLoading: false,
        appDataLoaded: true,
        appDataLoadError: null,
      }
    case ACTION_APP_DATA_LOAD_FAIL:
      return {
        ...state,
        appDataLoading: false,
        appDataLoaded: false,
        appDataLoadError: true,
      }
    default:
      return state;
  }
}

export const getCurrentUser = (state) => state.currentUser;
export const getIsAppDataLoading = (state) => state.appDataLoading;
export const getAppDataLoaded = (state) => state.appDataLoaded;
export const getAppDataLoadError = (state) => state.appDataLoadError;