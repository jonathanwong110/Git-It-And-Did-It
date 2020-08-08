import UsersActionTypes from "./types";

const INITIAL_STATE = {
  users: [],
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersActionTypes.LOADING_USERS:
      return {
        ...state,
        users: [...state.users]
      }
    case UsersActionTypes.USERS_LOADED:
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}

export default usersReducer