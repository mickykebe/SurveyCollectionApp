import { combineReducers } from "redux";
import { ACTION_PERMISSIONS_FETCH_SUCCESS } from "../actions/types";

const byCode = (state = {}, action) => {
  switch (action.type) {
    case ACTION_PERMISSIONS_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.permissions
      };
    default:
      return state;
  }
};

const codes = (state = [], action) => {
  switch (action.type) {
    case ACTION_PERMISSIONS_FETCH_SUCCESS:
      return action.response.result;
    default:
      return state;
  }
};

export default combineReducers({
  byCode,
  codes
});
