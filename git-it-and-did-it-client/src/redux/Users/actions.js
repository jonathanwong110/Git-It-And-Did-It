import UsersActionTypes from "./types";
import axios from 'axios'

let usersBaseURL = 'http://localhost:3000/api/v1/users'

export const loadUsers = () => {
  return (dispatch) => {
    dispatch({ type: UsersActionTypes.LOADING_USERS })
    axios.get(usersBaseURL).then(res => {
      dispatch({ type: UsersActionTypes.USERS_LOADED, users: res.data })
    }
    )
  }
}

export const userEdit = (newUserInformation) => {
  return dispatch => {
    return axios.patch(usersBaseURL, JSON.parse(localStorage.getItem('token').id)
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}