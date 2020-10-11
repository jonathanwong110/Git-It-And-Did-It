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

export const getSpecificUser = (userId) => {
  return (dispatch) => {
    axios.get(usersBaseURL + userId).then(res => {
      dispatch({ type: UsersActionTypes.GET_SPECIFIC_USER, specificUser: res.data })
    })
  }
}

export const editUser = (user) => {
  return (dispatch) => {
    return axios.patch(usersBaseURL + user.id, {user}).then(res => {
        dispatch({ type: UsersActionTypes.EDIT_USER, user: res.data});
        let token = {user}.user
        delete token.password
        return localStorage.setItem('token', JSON.stringify(token))
      }
    )
  }
}