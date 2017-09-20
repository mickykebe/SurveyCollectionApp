import {
  ACTION_RESPONSES_FETCH_REQUEST,
  ACTION_RESPONSES_FETCH_SUCCESS,
  ACTION_RESPONSES_FETCH_FAIL
} from '../actions/types';
import { combineReducers } from 'redux';
import asyncStatus from './hor/asyncStatus';
import pagination from './hor/pagination';
import { createKeyWrappedReducer } from './hor/utils';

const byId = (state = {}, action) => {
  switch(action.type) {
    case ACTION_RESPONSES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.response.entities.responses,
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  responsesStatus: createKeyWrappedReducer(
    action => action.survey
  )(combineReducers({
    status: asyncStatus(ACTION_RESPONSES_FETCH_REQUEST, ACTION_RESPONSES_FETCH_SUCCESS, ACTION_RESPONSES_FETCH_FAIL),
    pagination: pagination(ACTION_RESPONSES_FETCH_SUCCESS),
  }))
});

export const getSurveyResponse = (state, id) =>
  state.byId[id];
export const getIsFetchingSurveyResponses = (state, surveyId) =>
  !!(state.responsesStatus[surveyId] && state.responsesStatus[surveyId].status.inProgress);
export const getSurveyResponsesFetchErrors = (state, surveyId) =>
  (state.responsesStatus[surveyId] && state.responsesStatus[surveyId].status.errors) || null;
export const getSurveyResponsesCount = (state, surveyId) =>
  (state.responsesStatus[surveyId] && state.responsesStatus[surveyId].pagination.count) || 0;
export const getSurveyResponsesNext = (state, surveyId) =>
  (state.responsesStatus[surveyId] && state.responsesStatus[surveyId].pagination.next) || 0;