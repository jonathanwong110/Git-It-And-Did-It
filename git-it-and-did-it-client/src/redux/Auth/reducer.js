import AuthActionTypes from "./types";

const INITIAL_STATE = {
  currentUser: { id: "", email: "", profile_icon: "", username: "", password: "", tasks: [] },
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_START:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        error: null,
      };
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