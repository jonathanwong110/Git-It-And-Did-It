import AuthActionTypes from "./types";

const INITIAL_STATE = {
  currentUser: { id: "", email: "", profile_icon: "", username: "", password: "" },
  error: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_START:
      return {
        ...state,
        currentUser: action.payload,
        error: []
      }
    case AuthActionTypes.LOG_IN_FAILURE:
      return {
        ...state,
        error: ['Incorrect Username and/or Password']
      }
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        error: [],
      };
    case AuthActionTypes.LOG_OUT_START:
      return {
        ...state,
        currentUser: {},
        error: [],
      };
    default:
      return state;
  }
};

export default authReducer;