import * as Action_Types from './ActionType';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// LOAD USER
// if there is a token available
export const LoadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
      type: Action_Types.USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Action_Types.AUTH_ERROR,
    });
  }
};

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
  setTimeout(() => {
    dispatch({
      type: Action_Types.RESET_ALERT,
      payload: [],
    });
  }, 3000);
};

//REGISTER USER
export const Register = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      'http://localhost:5000/api/users/register',
      body,
      config
    );

    // c onsole.log(response);
    if (response.data.errors) {
      dispatch(setAlert(response.data.errors.msg, 'danger'));
      dispatch({
        type: Action_Types.REGISTER_FAIL,
      });
      // alert(response.data.errors.msg);
    } else {
      dispatch(setAlert('Account Created', 'success'));
      dispatch({
        type: Action_Types.REGISTER_SUCCESS,
        payload: response.data,
      });

      dispatch(LoadUser());
    }
  } catch (error) {
    console.error(error.message);
  }
};

//Login USER
export const Login = (body) => async (dispatch) => {
  try {
    const { email, password } = body;
    const Body = JSON.stringify({ email, password });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      Body,
      config
    );

    console.log(response);
    if (response.data.errors) {
      dispatch({
        type: Action_Types.LOGIN_FAIL,
      });
      dispatch(setAlert(response.data.errors[0].msg, 'danger'));
    } else {
      dispatch({
        type: Action_Types.LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch(LoadUser());
    }
  } catch (error) {
    console.error(error.message);
  }
};

//LOGOUT USER
export const Logout = () => (dispatch) => {
  dispatch({
    type: Action_Types.LOGOUT,
  });
};
