import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Alert } from './Alert';
import { Auth } from './Auth';
import { Comments } from './Comments';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ Alert: Alert, Auth: Auth, Comments: Comments }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
