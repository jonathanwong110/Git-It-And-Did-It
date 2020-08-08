import AuthActionTypes from "./types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_START:
      return {
        ...state,
        currentUser: action.payload.username,
        error: null
      }
    case AuthActionTypes.LOG_OUT_START:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;