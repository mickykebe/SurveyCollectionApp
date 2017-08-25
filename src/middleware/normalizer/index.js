import { normalize } from 'normalizr';
import * as schema from './schema';
import {
  ACTION_SURVEY_CREATE_SUCCESS,
  ACTION_SURVEYS_FETCH_SUCCESS
} from '../../actions';

export default store => next => action => {
  switch(action.type) {
    case ACTION_SURVEY_CREATE_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response, schema.surveySchema)
      });
    case ACTION_SURVEYS_FETCH_SUCCESS:
      return next({
        ...action,
        response: normalize(action.response.results, schema.surveyListSchema)
      });
    default:
      return next(action);
  }
};