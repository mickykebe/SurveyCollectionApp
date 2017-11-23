import { normalize } from 'normalizr';
import * as schema from './schema';
import * as actionTypes from '../../actions/types';

export default store => next => action => {
  switch(action.type) {
    case actionTypes.ACTION_SURVEY_CREATE_SUCCESS:
    case actionTypes.ACTION_SURVEY_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.surveySchema)
      });
    case actionTypes.ACTION_SURVEY_PENDING_FEED_FETCH_SUCCESS:
    case actionTypes.ACTION_SURVEY_PUBLISHED_FEED_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.surveyListSchema)
      });
    case actionTypes.ACTION_RESPONSES_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.responseListSchema),
      });
    case actionTypes.ACTION_PROFILE_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.profileSchema),
      });
    case actionTypes.ACTION_PROFILES_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.profileListSchema),
      });
    case actionTypes.ACTION_APP_DATA_LOAD_SUCCESS:
    case actionTypes.ACTION_LANGUAGE_FEED_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.languageListSchema),
      });
    case actionTypes.ACTION_LANGUAGE_UPDATE_SUCCESS:
    case actionTypes.ACTION_LANGUAGE_CREATE_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.languageSchema),
      });
    case actionTypes.ACTION_COMPANIES_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.companyListSchema),
      });
    case actionTypes.ACTION_ADMIN_REGISTER_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.company, schema.companySchema),
      });
    default:
      return next(action);
  }
};