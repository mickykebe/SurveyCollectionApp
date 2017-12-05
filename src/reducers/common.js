import {
  ACTION_COMMON_DATA_LOADED,
  ACTION_SET_CURRENT_USER,
  ACTION_LOGOUT
} from '../actions/types';

const defaultState = {
  currentUser: null,
  commonDataLoaded: false,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case ACTION_SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case ACTION_COMMON_DATA_LOADED:
      return {
        ...state,
        commonDataLoaded: true,
      }
    case ACTION_LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

export const getCurrentUser = (state) => state.currentUser;
export const getIsCommonDataLoaded = state => state.commonDataLoaded;