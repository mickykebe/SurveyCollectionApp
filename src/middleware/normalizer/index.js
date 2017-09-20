import { normalize } from 'normalizr';
import * as schema from './schema';
import {
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEY_FEED_FETCH_SUCCESS,
  ACTION_SURVEY_FETCH_SUCCESS,
  ACTION_RESPONSES_FETCH_SUCCESS,
} from '../../actions/types';

export default store => next => action => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
    case ACTION_SURVEY_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.surveySchema)
      });
    case ACTION_SURVEY_FEED_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.surveyListSchema)
      });
    case ACTION_RESPONSES_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.responseListSchema),
      });
    default:
      return next(action);
  }
};