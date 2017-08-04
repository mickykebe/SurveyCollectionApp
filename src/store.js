import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';

const getMiddleware = () => {
  const middlewares = [promiseMiddleware, localStorageMiddleware];

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }
  return applyMiddleware(...middlewares);
}

const store = createStore(reducer, composeWithDevTools(getMiddleware()));

export default store;