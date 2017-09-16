import {
  ACTION_RESPONSES_FETCH_REQUEST,
  ACTION_RESPONSES_FETCH_SUCCESS,
  ACTION_RESPONSES_FETCH_FAIL
} from '../actions/types';
import { combineReducers } from 'redux';
import asyncStatus from './hor/asyncStatus';
import { keyWrapState } from './hor/utils';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_RESPONSES_FETCH_SUCCESS:
      return {
        ...action.response.entities.responses,
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  responsesStatus: keyWrapState(
    [ACTION_RESPONSES_FETCH_REQUEST, ACTION_RESPONSES_FETCH_SUCCESS, ACTION_RESPONSES_FETCH_FAIL],
    action => action.survey)(asyncStatus),
});

export const getSurveyResponse = (state, id) =>
  state.byId[id];
export const getIsFetchingSurveyResponses = (state, surveyId) =>
  !!(state.responsesStatus[surveyId] && state.responsesStatus[surveyId].inProgress);
export const getSurveyResponsesFetchErrors = (state, surveyId) =>
  (state.responsesStatus[surveyId] && state.responsesStatus[surveyId].errors) || null;