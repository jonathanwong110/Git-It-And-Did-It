import UserActionTypes from "./types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOG_IN_START:
      return {
        ...state,
        currentUser: action.payload.username,
        error: null
      }
    default:
      return state;
  }
};

export default userReducer;