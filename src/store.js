import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';
import api from './api';
import localStorageMiddleware from './middleware/localStorage';
import normalizerMiddleware from './middleware/normalizer';

const getMiddleware = () => {
  const middlewares = [thunk.withExtraArgument(api), localStorageMiddleware, normalizerMiddleware];

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  return applyMiddleware(...middlewares);
}

const store = createStore(
  reducers, 
  composeWithDevTools(getMiddleware())
);

export default store;