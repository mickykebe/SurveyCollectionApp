import { combineReducers } from 'redux';
import { ACTION_CURRENCIES_FETCH_SUCCESS } from '../actions/types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_CURRENCIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.currencies,
      }
    default:
      return state;
  }
}

const ids = (state = [], action) => {
  switch(action.type) {
    case ACTION_CURRENCIES_FETCH_SUCCESS:
      return action.response.result;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  ids,
});

export const getCurrencies = (state) =>
  state.ids.map(id => state.byId[id]);