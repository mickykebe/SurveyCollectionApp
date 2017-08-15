import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducers from './reducers';

const getMiddleware = () => {
  const middlewares = [promiseMiddleware, localStorageMiddleware];

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }
  return applyMiddleware(...middlewares);
}

const store = createStore(reducers, composeWithDevTools(getMiddleware()));

export default store;