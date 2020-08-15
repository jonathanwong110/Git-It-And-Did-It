import TasksActionTypes from "./types";
import axios from 'axios'

let tasksBaseURL = 'http://localhost:3000/api/v1/tasks/'

export const loadTasks = () => {
  return (dispatch) => {
    dispatch({ type: TasksActionTypes.LOADING_TASKS})
    axios.get(tasksBaseURL).then(res => {
      dispatch({ type: TasksActionTypes.TASKS_LOADED, tasks: res.data })
      }
    )
  }
}