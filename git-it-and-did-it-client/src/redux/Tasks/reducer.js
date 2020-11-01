import TasksActionTypes from "./types";

const INITIAL_STATE = {
  tasks: [],
  status: null,
  specificTask: {},
  assignedTasks: [],
  errors: {}
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TasksActionTypes.LOADING_TASKS:
      return {
        ...state,
        status: 'LOADING'
      }
    case TasksActionTypes.TASKS_LOADED:
      return {
        ...state,
        status: 'LOADING_COMPLETE',
        tasks: action.tasks
      }
    case TasksActionTypes.GET_SPECIFIC_TASK:
      return {
        ...state,
        specificTask: action.specificTask
      }
    case TasksActionTypes.GET_USER_TASKS:
      return {
        ...state,
        tasks: action.tasks
      }
    case TasksActionTypes.GET_ASSIGNED_TASKS:
      return {
        ...state, 
        assignedTasks: action.tasks,
      }
    case TasksActionTypes.REMOVE_CURRENT_TASK:
      return {
        ...state,
        currentTask: null
      }
    case TasksActionTypes.NEW_TASK_PROCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      }
    case TasksActionTypes.TASK_FAILURE:
      return {
        ...state,
        errors: action.errors.response.data.errors
      }
    case TasksActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.taskId)
      }
    case TasksActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.task.id) {
            return action.task
          }
          return task
        })
      }
    default:
      return state
  }
}

export default tasksReducer