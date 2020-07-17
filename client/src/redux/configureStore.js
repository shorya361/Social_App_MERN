import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Alert } from './Alert';
import { Auth } from './Auth';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ Alert: Alert, Auth: Auth }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
