import AuthActionTypes from "./types";

const INITIAL_STATE = {
  currentUser: { id: "", email: "", profile_icon: "", username: "", password: "" },
  errors: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_START:
      return {
        ...state,
        currentUser: action.payload,
        errors: {}
      }
    case AuthActionTypes.LOG_IN_FAILURE:
      return {
        ...state,
        errors: action.errors.response.data.errors
      }
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        errors: {},
      };
    case AuthActionTypes.LOG_OUT_START:
      return {
        ...state,
        currentUser: {},
        errors: {},
      };
    default:
      return state;
  }
};

export default authReducer;