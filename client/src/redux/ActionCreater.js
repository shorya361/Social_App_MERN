import * as Action_Types from './ActionType';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//======================================================================================
// LOAD USER
// if there is a token available
export const LoadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
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

//AllUsers
export const LoadAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/');
    dispatch({
      type: Action_Types.LOAD_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//REGISTER USER
export const Register = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/api/users/register', body, config);

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
    const response = await axios.post('/api/auth/login', Body, config);

    // console.log(response);
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
      dispatch(setAlert('Welcome ', 'success'));
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

//DEACTIVATE ACCOUNT
export const deactivate = (body) => async (dispatch) => {
  try {
    const { Profile } = body;
    var Body = JSON.stringify({ Profile });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/users/changeStatus', Body, config);
    dispatch(LoadAllUsers());
    dispatch(LoadUser());
    if (res.data.user.activated) {
      dispatch(setAlert('Account is Now Activated!!!', 'success'));
    } else {
      dispatch(setAlert('Account Deactivated !!', 'success'));
    }
  } catch (error) {
    dispatch(setAlert('Server Error, Try Again', 'danger'));
  }
};

//UPDATE PROFILE
export const update = (body) => async (dispatch) => {
  try {
    const { userId, name, description, city, Image } = body;
    const Body = JSON.stringify({ userId, name, description, city, Image });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/users/updateProfile', Body, config);
    dispatch(LoadUser());
    dispatch(LoadComments());
    dispatch(LoadAllUsers());
    dispatch(setAlert('Profile Updated!!', 'success'));
  } catch (error) {
    dispatch(setAlert('Server Error, Try Again', 'danger'));
  }
};

//FOLLOW A USER
export const FollowRequest = (body) => async (dispatch) => {
  try {
    let { UserID, follow } = body;
    let Body = JSON.stringify({ UserID, follow });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/users/follow', Body, config);
    console.log(res);
    dispatch(LoadUser());
    dispatch(LoadComments());
    dispatch(LoadAllUsers());
    dispatch(
      setAlert('You are now following ' + res.data.following.name, 'success')
    );
  } catch (error) {
    dispatch(setAlert('Server Error, Try Again', 'danger'));
  }
};

//UNFOLLOW A USER
export const UnFollowRequest = (body) => async (dispatch) => {
  try {
    let { UserID, follow } = body;
    let Body = JSON.stringify({ UserID, follow });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/users/unfollow', Body, config);
    // console.log(res);
    dispatch(LoadUser());
    dispatch(LoadComments());
    dispatch(LoadAllUsers());
    dispatch(
      setAlert('You just unfollowed ' + res.data.following.name, 'success')
    );
  } catch (error) {
    dispatch(setAlert('Server Error, Try Again', 'danger'));
  }
};

//GET TIMELINE FOR CURRENT USER
export const getTimeline = (body) => async (dispatch) => {
  try {
    const { UserID } = body;
    let Body = JSON.stringify({ UserID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/Posts/getTimeline', Body, config);
    const sortedtimeline = res.data.sort((a, b) => a.date - b.date);
    sortedtimeline.reverse();

    dispatch({
      type: Action_Types.GETTIMELINE,
      payload: sortedtimeline,
    });
  } catch (error) {
    dispatch(setAlert('Server Error, Reload the page', 'danger'));
  }
};

//Reset password
export const resetPassword = (body) => async (dispatch) => {
  try {
    const { email } = body;
    var url = '/api/users/resetPassword/' + email;
    // console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(url, {}, config);
    // console.log(res);
    if (res.data.errors) {
      dispatch(setAlert(res.data.errors.msg, 'danger'));
    } else {
      dispatch(setAlert(res.data, 'success'));
    }
  } catch (error) {
    dispatch(setAlert('Server Error, try again', 'danger'));
    console.log('error in reset Password request :' + error.message);
  }
};

//Change password
export const ChangePassword = (body) => async (dispatch) => {
  try {
    console.log(body);
    const { UserID, token, password } = body;
    const Body = JSON.stringify({ password });
    var url = '/api/users/ChangePassword/' + UserID + '/' + token;
    console.log(url);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(url, Body, config);
    if (res.data.errors) {
      dispatch(setAlert(res.data.errors.msg, 'danger'));
    } else {
      dispatch(setAlert(res.data, 'success'));
    }
  } catch (error) {
    dispatch(setAlert('Server Error, try again', 'danger'));
    console.log('error in reset Password request :' + error.message);
  }
};
//==================================================================================
//ALERT SECTION
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
  }, 2000);
};

//==================================================================================
//COMMENT SECTION
//LOAD COMMENTS
export const LoadComments = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/comment/');
    dispatch({
      type: Action_Types.LOAD_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Action_Types.AUTH_ERROR,
    });
  }
};

//ADD COMMENTS
export const addNewComment = (body) => async (dispatch) => {
  try {
    const { Post, comment, UserId } = body;
    const Body = JSON.stringify({ Post, comment, UserId });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/comment/addComment', Body, config);
    dispatch(LoadComments());
    dispatch(LoadUser());
    dispatch(setAlert('Comment Added', 'success'));
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserId }));
  } catch (error) {
    dispatch(setAlert('Cannot add new comment, Plz try again', 'danger'));
  }
};

//EDIT COMMENT
export const updateComment = (body) => async (dispatch) => {
  try {
    const { comment, commentID } = body;
    const Body = JSON.stringify({ comment, commentID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/comment/updateComment', Body, config);
    dispatch(LoadComments());
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(setAlert('Comment Updated', 'success'));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//DELETE A COMMENT
export const deleteComment = (body) => async (dispatch) => {
  try {
    const { comment } = body;
    const Body = JSON.stringify({ comment });
    // const update = JSON.stringify({ UserID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/comment/deleteComment', Body, config);
    dispatch(LoadComments());
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(setAlert('Comment Deleted', 'success'));
    // dispatch(getTimeline(update));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};
//==================================================================================
// POST SECTION

//ADD NEW POST

export const addnewPost = (body) => async (dispatch) => {
  try {
    const { name, image, description, userID } = body;
    const Body = JSON.stringify({ name, image, description, userID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('/api/Posts/addPost', Body, config);
    // console.log(res);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());

    dispatch(setAlert('Post Added', 'success'));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//UPDATE POST
export const updatePost = (body) => async (dispatch) => {
  try {
    // console.log(body);

    const { name, image, description, PostID, UserID } = body;
    const Body = JSON.stringify({ name, image, description, PostID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/Posts/updatePost', Body, config);
    // console.log(res);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserID }));
    dispatch(setAlert('Post Updated', 'success'));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//DELETE POST
export const deletePost = (body) => async (dispatch) => {
  try {
    const { UserID } = body;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // console.log(Body);
    await axios.put('/api/Posts/deletePost', body, config);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(LoadComments());
    dispatch(getTimeline({ UserID: UserID }));

    dispatch(setAlert('Post Deleted', 'success'));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//Like A post
export const Like = (body) => async (dispatch) => {
  try {
    const { Post, UserID } = body;
    const Body = JSON.stringify({ Post, UserID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/Posts/Like', Body, config);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserID }));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//Unlike A post
export const UnLike = (body) => async (dispatch) => {
  try {
    const { Post, UserID } = body;
    const Body = JSON.stringify({ Post, UserID });
    console.log(Body);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/Posts/UnLike', Body, config);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserID }));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//DownVote A post
export const DownVote = (body) => async (dispatch) => {
  try {
    const { Post, UserID } = body;
    const Body = JSON.stringify({ Post, UserID });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/Posts/DownVote', Body, config);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserID }));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};

//UnDownVote A post
export const UnDownVote = (body) => async (dispatch) => {
  try {
    const { Post, UserID } = body;
    const Body = JSON.stringify({ Post, UserID });
    console.log(Body);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.put('/api/Posts/UnDisLike', Body, config);
    dispatch(LoadUser());
    dispatch(LoadAllUsers());
    dispatch(getTimeline({ UserID: UserID }));
  } catch (error) {
    dispatch(setAlert('Server Error, Plz try again', 'danger'));
  }
};
