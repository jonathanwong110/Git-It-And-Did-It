import UsersActionTypes from "./types";
import axios from 'axios'

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

export const setCurrentUser = (userId) => {
  return (dispatch) => {
    dispatch({ type: UsersActionTypes.SET_CURRENT_USER, userId })
  }
}

export const editUser = (updatedUser) => {
  return (dispatch) => {
    return axios.patch(usersBaseURL + updatedUser.id, updatedUser).then(res => {
        dispatch({ type: UsersActionTypes.EDIT_USER, user: res.data})
      }
    )
  }
}