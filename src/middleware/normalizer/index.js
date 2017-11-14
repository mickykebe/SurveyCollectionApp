import { normalize } from 'normalizr';
import * as schema from './schema';
import {
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEY_FEED_FETCH_SUCCESS,
  ACTION_SURVEY_FETCH_SUCCESS,
  ACTION_RESPONSES_FETCH_SUCCESS,
  ACTION_APP_DATA_LOAD_SUCCESS,
  ACTION_LANGUAGE_FEED_FETCH_SUCCESS,
  ACTION_LANGUAGE_CREATE_SUCCESS,
  ACTION_LANGUAGE_UPDATE_SUCCESS,
  ACTION_COMPANIES_FETCH_SUCCESS,
  ACTION_ADMIN_REGISTER_SUCCESS
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
    case ACTION_APP_DATA_LOAD_SUCCESS:
    case ACTION_LANGUAGE_FEED_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.languageListSchema),
      });
    case ACTION_LANGUAGE_UPDATE_SUCCESS:
    case ACTION_LANGUAGE_CREATE_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.languageSchema),
      });
    case ACTION_COMPANIES_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.companyListSchema),
      });
    case ACTION_ADMIN_REGISTER_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.company, schema.companySchema),
      });
    default:
      return next(action);
  }
};