import * as Action_Types from './ActionType';

export const Alert = (state = [], action) => {
  switch (action.type) {
    case Action_Types.SET_ALERT:
      return [...state, action.payload];

    case Action_Types.RESET_ALERT:
      return [];
    default:
      return state;
  }
};
