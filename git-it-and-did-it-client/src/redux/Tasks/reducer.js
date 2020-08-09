import TasksActionTypes from "./types";

const INITIAL_STATE = {
  tasks: [],
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TasksActionTypes.LOADING_TASKS:
      return {
        ...state,
        tasks: [...state.tasks]
      }
    case TasksActionTypes.TASKS_LOADED:
      return {
        ...state,
        tasks: action.tasks
      }
    default:
      return state
  }
}

export default tasksReducer