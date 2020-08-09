import * as ActionTypes from './ActionType';

export const timeline = (
  state = {
    Post: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GETTIMELINE:
      return {
        Post: action.payload,
      };
    case ActionTypes.CLEARTIMELINE:
      return {
        Post: null,
      };
    default:
      return state;
  }
};
