import { combineReducers } from "redux";
import union from "lodash/union";
import * as actions from "../actions/types";
import asyncStatus from "./hor/asyncStatus";
import pagination from "./hor/pagination";
import { createKeyWrappedReducer } from "./hor/utils";

const PENDING_KEY = "pending";
const PUBLISHED_KEY = "published";
const statusKey = active => (active ? PUBLISHED_KEY : PENDING_KEY);

const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.ACTION_SURVEY_CREATE_SUCCESS:
    case actions.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS:
    case actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS:
    case actions.ACTION_SURVEY_FETCH_SUCCESS:
    case actions.ACTION_SURVEY_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.surveys
      };
    case actions.ACTION_LOGOUT:
      return {};
    default:
      return state;
  }
};

const createList = activeStatus => {
  const ids = (state = [], action) => {
    const handleCreate = (state, action) => {
      const { result: surveyId, entities } = action.response;
      const { active } = entities.surveys[surveyId];
      return active === activeStatus ? [surveyId, ...state] : state;
    };
    const handleUpdate = (state, action) => {
      const { result: surveyId, entities } = action.response;
      const { active } = entities.surveys[surveyId];
      const shouldRemove =
        active !== activeStatus &&
        state.findIndex(id => id === surveyId) !== -1;
      return shouldRemove ? state.filter(id => id !== surveyId) : state;
    };
    switch (action.type) {
      case actions.ACTION_SURVEY_CREATE_SUCCESS:
        return handleCreate(state, action);
      case actions.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS:
        return !activeStatus ? union(action.response.result, state) : state;
      case actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS:
        return activeStatus ? union(action.response.result, state) : state;
      case actions.ACTION_SURVEY_UPDATE_SUCCESS:
        return handleUpdate(state, action);
      case actions.ACTION_SURVEY_DELETE_SUCCESS:
        return state.filter(id => id !== action.id);
      case actions.ACTION_LOGOUT:
        return [];
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    pagination: pagination(
      activeStatus
        ? actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS
        : actions.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS
    ),
    status: asyncStatus(
      activeStatus
        ? actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_REQUEST
        : actions.ACTION_SURVEY_PENDING_FEED_FETCH_REQUEST,
      activeStatus
        ? actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS
        : actions.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS,
      activeStatus
        ? actions.ACTION_SURVEY_PUBLISHED_FEED_FETCH_FAIL
        : actions.ACTION_SURVEY_PENDING_FEED_FETCH_FAIL
    )
  });
};

const responsesById = (state = {}, action) => {
  switch (action.type) {
    case actions.ACTION_RESPONSES_FETCH_SUCCESS: {
      return {
        ...state,
        [action.survey]: union(state[action.survey], action.response.result)
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  [PENDING_KEY]: createList(false),
  [PUBLISHED_KEY]: createList(true),
  responsesById,
  create: asyncStatus(
    actions.ACTION_SURVEY_CREATE_REQUEST,
    actions.ACTION_SURVEY_CREATE_SUCCESS,
    actions.ACTION_SURVEY_CREATE_FAIL
  ),
  fetch: createKeyWrappedReducer(action => action.id)(
    asyncStatus(
      actions.ACTION_SURVEY_FETCH_REQUEST,
      actions.ACTION_SURVEY_FETCH_SUCCESS,
      actions.ACTION_SURVEY_FETCH_FAIL
    )
  ),
  update: createKeyWrappedReducer(action => action.id)(
    asyncStatus(
      actions.ACTION_SURVEY_UPDATE_REQUEST,
      actions.ACTION_SURVEY_UPDATE_SUCCESS,
      actions.ACTION_SURVEY_UPDATE_FAIL
    )
  ),
  delete: createKeyWrappedReducer(action => action.id)(
    asyncStatus(
      actions.ACTION_SURVEY_DELETE_REQUEST,
      actions.ACTION_SURVEY_DELETE_SUCCESS,
      actions.ACTION_SURVEY_DELETE_FAIL
    )
  )
});

export const getSurvey = (state, id) => state.byId[id];
export const getSurveys = (state, active) =>
  state[statusKey(active)].ids.map(id => state.byId[id]);
export const getSurveyResponseIds = (state, id) =>
  state.responsesById[id] || [];
export const getIsFetchingSurveys = (state, active) =>
  state[statusKey(active)].status.inProgress;
export const getSurveysFetchErrors = (state, active) =>
  state[statusKey(active)].status.errors;
export const getSurveysCount = (state, active) =>
  state[statusKey(active)].pagination.count;
export const getSurveysNext = (state, active) =>
  state[statusKey(active)].pagination.next;
export const getIsCreatingSurvey = state => state.create.inProgress;
export const getSurveyCreateErrors = state => state.create.errors;
export const getIsFetchingSurvey = (state, id) =>
  !!(state.fetch[id] && state.fetch[id].inProgress);
export const getSurveyFetchErrors = (state, id) =>
  (state.fetch[id] && state.fetch[id].errors) || null;
export const getIsUpdatingSurvey = (state, id) =>
  !!(state.update[id] && state.update[id].inProgress);
export const getIsDeletingSurvey = (state, id) =>
  !!(state.delete[id] && state.delete[id].inProgress);
export const getSurveyDeleteErrors = (state, id) =>
  (state.delete[id] && state.delete[id].errors) || null;
