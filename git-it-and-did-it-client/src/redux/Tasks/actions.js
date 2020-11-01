import TasksActionTypes from "./types";
import axios from 'axios'

let tasksBaseURL = 'http://localhost:3000/api/v1/tasks/'

export const loadTasks = (type, value) => {
  return (dispatch) => {
    dispatch({ type: TasksActionTypes.LOADING_TASKS })
    let url = tasksBaseURL
    if (type && value) {
      url = url + '/' + type + '/' + value
    }
    axios.get(url).then(res => {
      dispatch({ type: TasksActionTypes.TASKS_LOADED, tasks: res.data })
    })
  }
}

export const getSpecificTask = (taskId) => {
  return (dispatch) => {
    axios.get(tasksBaseURL + taskId).then(res => {
      dispatch({ type: TasksActionTypes.GET_SPECIFIC_TASK, specificTask: res.data })
    })
  }
}

export const addTask = (task, history) => {
  return (dispatch) => {
    return axios.post(tasksBaseURL, task
    )
      .then(function (res) {
        dispatch({ type: TasksActionTypes.NEW_TASK_PROCESS, task: res.data })
        const newTaskId = res.data.id
        history.push('/tasks/' + newTaskId)
      })
      .catch(function (error) {
        return dispatch({ type: TasksActionTypes.TASK_FAILURE, errors: error })
      });
  }
}

export const newTaskProcess = (task) => ({
  type: TasksActionTypes.NEW_TASK_PROCESS,
  payload: task,
})

export const newTaskFailure = (error) => ({
  type: TasksActionTypes.TASK_FAILURE,
  payload: error,
});

export const deleteTask = (id, history) => {
  return (dispatch) => {
    axios.delete(tasksBaseURL + id).then(res => {
      dispatch({ type: TasksActionTypes.DELETE_TASK, taskId: id })
      axios.get(tasksBaseURL)
        .then(function (response) {
          history.push('/tasks')
        })
    })
  }
}

export const editTask = (updatedTask, history) => {
  return (dispatch) => {
    return axios.patch(tasksBaseURL + updatedTask.id, updatedTask)
      .then(res => {
        dispatch({ type: TasksActionTypes.EDIT_TASK, task: res.data })
        axios.get(tasksBaseURL)
          .then(function (response) {
            history.push(`/tasks/${updatedTask.id}`)
          })
      })
      .catch(function (error) {
        return dispatch({ type: TasksActionTypes.TASK_FAILURE, errors: error })
      });
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
    return axios.get(tasksBaseURL + 'assignee/' + assignee)
      .then(res => {
        dispatch({ type: TasksActionTypes.GET_ASSIGNED_TASKS, tasks: res.data })
      })
  }
}