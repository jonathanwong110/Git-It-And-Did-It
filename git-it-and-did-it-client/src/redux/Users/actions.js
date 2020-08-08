import UsersActionTypes from "./types";
import axios from 'axios'

const baseURL = 'http://localhost:3000/api/v1/users/'

export const loadUsers = () => {
  return (dispatch) => {
    dispatch({ type: UsersActionTypes.LOADING_USERS})
    axios.get(baseURL).then(res => {
      dispatch({ type: UsersActionTypes.USERS_LOADED, users: res.data })
      console.log(res.data)
      }
    )
  }
}