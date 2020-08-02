import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Alert } from './Alert';
import { Auth } from './Auth';
import { Comments } from './Comments';
import { AllUsers } from './AllUsers';
import { timeline } from './timeline';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      Alert: Alert,
      Auth: Auth,
      Comments: Comments,
      AllUsers: AllUsers,
      timeline: timeline,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
