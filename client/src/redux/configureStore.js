import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Alert } from './Alert';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ Alert: Alert }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
