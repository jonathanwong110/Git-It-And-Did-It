import UsersActionTypes from "./types";

const INITIAL_STATE = {
  users: [],
  status: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        users: action.users
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
    default:
      return state
  }
}

export default usersReducer