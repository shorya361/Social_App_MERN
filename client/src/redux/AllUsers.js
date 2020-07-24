import * as ActionTypes from './ActionType';

export const AllUsers = (
  state = {
    Users: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_ALL_USERS:
      return {
        Users: action.payload,
      };
    default:
      return state;
  }
};
