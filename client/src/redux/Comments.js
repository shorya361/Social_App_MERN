import * as ActionTypes from './ActionType';

export const Comments = (
  state = {
    Comments: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_COMMENTS:
      return {
        Comments: action.payload,
      };
    default:
      return state;
  }
};
