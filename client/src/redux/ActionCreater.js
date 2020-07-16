import * as Action_Types from './ActionType';
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (message, AlertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: Action_Types.SET_ALERT,
    payload: {
      message,
      AlertType,
      id,
    },
  });
};

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: Action_Types.RESET_ALERT,
    payload: [],
  });
};
