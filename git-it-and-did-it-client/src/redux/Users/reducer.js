import UsersActionTypes from "./types";
import AuthActionTypes from "../Auth/types";

const INITIAL_STATE = {
  users: [],
  status: null,
  specificUser: {},
  errors: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    case UsersActionTypes.LOADING_USERS:
      return {
        ...state,
        status: 'LOADING_USERS',
        users: [...state.users]
      }
    case UsersActionTypes.USERS_LOADED:
      return {
        ...state,
        status: 'LOADING_USERS_COMPLETED',
        users: action.users
      }
    case UsersActionTypes.GET_SPECIFIC_USER:
      return {
        ...state,
        specificUser: action.specificUser
      }
    case UsersActionTypes.EDIT_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.user.id) {
            return action.user
          }
          return user
        })
      }
    case UsersActionTypes.USER_FAILURE:
      return {
        ...state,
        errors: action.errors.response.data.errors
      }
    default:
      return state
  }
}

export default usersReducer