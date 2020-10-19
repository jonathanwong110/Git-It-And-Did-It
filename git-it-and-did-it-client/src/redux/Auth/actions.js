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
        delete token.password
        localStorage.setItem('token', JSON.stringify(token))
        dispatch(logInProcess(token))
      })
      .catch(function (error) {
        return dispatch({ type: AuthActionTypes.AUTH_FAILURE, errors: error })
      });
  }
}

export const authFailure = (error) => ({
  type: AuthActionTypes.AUTH_FAILURE,
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

export const signUp = (user, history) => {
  return (dispatch) => {
    axios.post(usersBaseURL, { user })
      .then(res => {
        dispatch({ type: AuthActionTypes.SIGN_UP, user: res.data })
        history.push('/login')
      })
      .catch(function (error) {
        return dispatch({ type: AuthActionTypes.AUTH_FAILURE, errors: error })
      })
  }
}