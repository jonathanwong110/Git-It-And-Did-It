import UserActionTypes from "./types";

export const logInStart = (usernameAndPassword) => ({
  type: UserActionTypes.LOG_IN_START,
  payload: usernameAndPassword,
});

export const logInSuccess = (user) => ({
  type: UserActionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const logInFailure = (error) => ({
  type: UserActionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});