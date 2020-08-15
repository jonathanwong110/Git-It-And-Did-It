import AuthActionTypes from "./types";
import axios from 'axios'

let logInBaseURL = 'http://localhost:3000/api/v1/login'

export const logInProcess = (usernameAndPassword) => ({
  type: AuthActionTypes.LOG_IN_START,
  payload: usernameAndPassword,
});

export const logInStart = (usernameAndPassword) => {
  return dispatch => {
    return axios.post(logInBaseURL,
      usernameAndPassword
    )
    .then(function (response) {
      const token = response.data
      localStorage.setItem('token', JSON.stringify(token))
      return dispatch(logInProcess(usernameAndPassword))
    })
    .catch(function (error) {
      console.log(error);
      return dispatch(logInFailure(error))
    });
  }
}

export const logInFailure = (error) => ({
  type: AuthActionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const logOutProcess = () => ({
  type: AuthActionTypes.LOG_OUT_START,
});

export const logOutStart = () => {
  localStorage.removeItem('token')
  return dispatch => {
    return dispatch(logOutProcess())
  }
}
