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

export const addTask = (task) => {
  return (dispatch) => {
    axios.post(tasksBaseURL, task).then(res => {
        dispatch({ type: TasksActionTypes.ADD_TASK, task: res.data})
      }
    )
  }
}

export const deleteTask = (id) => {
  return (dispatch) => {
    axios.delete(tasksBaseURL + id).then(res => {
      dispatch({ type: TasksActionTypes.DELETE_TASK, id: id})
    })
  }
}