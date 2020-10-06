import TasksActionTypes from "./types";
import axios from 'axios'

let tasksBaseURL = 'http://localhost:3000/api/v1/tasks/'

export const loadTasks = (type, value) => {
  return (dispatch) => {
    dispatch({ type: TasksActionTypes.LOADING_TASKS})
    let url = tasksBaseURL
    if (type && value) {
      url = url + '/' + type + '/' + value
    }
    axios.get(url).then(res => {
      dispatch({ type: TasksActionTypes.TASKS_LOADED, tasks: res.data })
      }
    )
  }
}

export const setCurrentTask = (taskId) => {
  return (dispatch) => {
    dispatch({ type: TasksActionTypes.SET_CURRENT_TASK, taskId })
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
      dispatch({ type: TasksActionTypes.DELETE_TASK, taskId: id})
    })
  }
}

export const editTask = (updatedTask) => {
  return (dispatch) => {
    return axios.patch(tasksBaseURL + updatedTask.id, updatedTask).then(res => {
        dispatch({ type: TasksActionTypes.EDIT_TASK, task: res.data})
      }
    )
  }
}

export const getUserTasks = (userId) => {
  return (dispatch) => {
    axios.get(tasksBaseURL + 'usertasks/' + userId).then(res => {
      dispatch({ type: TasksActionTypes.GET_USER_TASKS, tasks: res.data })
    })
  }
}

export const getAssignedTasks = (assignee) => {
  return (dispatch) => {
    axios.get(tasksBaseURL + 'assignee/' + assignee).then(res => {
      dispatch({ type: TasksActionTypes.GET_ASSIGNED_TASKS, tasks: res.data })
    })
  }
}