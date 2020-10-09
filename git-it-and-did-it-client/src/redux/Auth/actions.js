import AuthActionTypes from "./types";
import axios from 'axios'

let logInBaseURL = 'http://localhost:3000/api/v1/login'
let usersBaseURL = 'http://localhost:3000/api/v1/users/'

export const logInProcess = (currentUser) => ({
  type: AuthActionTypes.LOG_IN_START,
  payload: currentUser,
});

export const logInStart = (usernameAndPassword) => {
  return dispatch => {
    return axios.post(logInBaseURL,
      usernameAndPassword
    )
    .then(function (response) {
      const token = response.data
      localStorage.setItem('token', JSON.stringify(token))
      dispatch(logInProcess(token))
      return
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
    dispatch(logOutProcess())
  }
}

export const setCurrentUser = () => {
  return (dispatch) => {
    if (localStorage.getItem('token')) {
      const currentUser = JSON.parse(localStorage.getItem('token'))
      dispatch({ type: AuthActionTypes.SET_CURRENT_USER, currentUser })
    } else {
      return dispatch(logOutProcess())
    }
  }
}

export const signUp = (user) => {
  return (dispatch) => {
    axios.post(usersBaseURL, {user}).then(res => {
        dispatch({ type: AuthActionTypes.SIGN_UP, user: res.data})
      }
    )
  }
}