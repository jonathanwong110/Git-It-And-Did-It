import UsersActionTypes from "./types";
import axios from '../API/index.js'

let usersBaseURL = 'http://localhost:3000/api/v1/users/'

export const loadUsers = () => {
  return (dispatch) => {
    dispatch({ type: UsersActionTypes.LOADING_USERS })
    axios.get(usersBaseURL).then(res => {
      dispatch({ type: UsersActionTypes.USERS_LOADED, users: res.data })
    }
    )
  }
}

export const getSpecificUser = (userId) => {
  return (dispatch) => {
    axios.get(usersBaseURL + userId).then(res => {
      dispatch({ type: UsersActionTypes.GET_SPECIFIC_USER, specificUser: res.data })
    })
  }
}

export const userFailure = (error) => ({
  type: UsersActionTypes.USER_FAILURE,
  payload: error,
});

export const editUser = (user, history) => {
  return (dispatch) => {
    return axios.patch(usersBaseURL + user.id, { user }).then(res => {
      dispatch({ type: UsersActionTypes.EDIT_USER, user: res.data });
      let jwt = JSON.parse(localStorage.getItem('token')).jwt
      let token = { user }
      delete token.user.password
      token["user"]["email"] = token["user"]["email"].toLowerCase()
      token["jwt"] = jwt
      localStorage.setItem('token', JSON.stringify(token))
      return history.push('/dashboard')
    })
      .catch(function (error) {
        return dispatch({ type: UsersActionTypes.USER_FAILURE, errors: error })
      })
  }
}