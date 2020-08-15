import CommentsActionTypes from "./types";
import axios from 'axios'

let commentsBaseURL = 'http://localhost:3000/api/v1/comments/'

export const addComment = (comment) => {
  return (dispatch) => {
    axios.post(commentsBaseURL, comment).then(res => {
        dispatch({ type: CommentsActionTypes.ADD_COMMENT, comment: res.data})
      }
    )
  }
}

export const deleteComment = (id) => {
  return (dispatch) => {
    axios.delete(commentsBaseURL + id).then(res => {
      dispatch({ type: CommentsActionTypes.DELETE_COMMENT, id: id})
    })
  }
}