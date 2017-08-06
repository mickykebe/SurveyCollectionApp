import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './reducers/auth';
import common from './reducers/common';

export default combineReducers({
  common,
  auth,
  form: formReducer,
});