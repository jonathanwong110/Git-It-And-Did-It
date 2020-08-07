import UserActionTypes from "./types";
import axios from 'axios'

let baseUrl = 'http://localhost:3000/api/v1/login'

export const logInProcess = (usernameAndPassword) => ({
  type: UserActionTypes.LOG_IN_START,
  payload: usernameAndPassword,
});

export const logInStart = (usernameAndPassword) => {
  return dispatch => {
    return axios.post(baseUrl,
      usernameAndPassword
    )
    .then(function (response) {
      console.log(response);
      const token = response.data
      localStorage.setItem('token', token)
      return dispatch(logInProcess(usernameAndPassword))
    })
    .catch(function (error) {
      console.log(error);
      return dispatch(logInFailure(error))
    });
  }
}

export const logInFailure = (error) => ({
  type: UserActionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const logOutProcess = () => ({
  type: UserActionTypes.LOG_OUT_START,
});

export const logOutStart = () => {
  localStorage.removeItem('token')
  return dispatch => {
    return dispatch(logOutProcess())
  }
}
