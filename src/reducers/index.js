import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './auth';
import common from './common';

export default combineReducers({
  common,
  auth,
  form: formReducer,
});