import * as ActionTypes from './ActionType';

export const Auth = (
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case ActionTypes.REGISTER_SUCCESS:
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case ActionTypes.REGISTER_FAIL:
    case ActionTypes.AUTH_ERROR:
    case ActionTypes.LOGIN_FAIL:
    case ActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
