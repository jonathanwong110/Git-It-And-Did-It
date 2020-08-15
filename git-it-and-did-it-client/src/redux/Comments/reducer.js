import CommentsActionType from './types'

const INITIAL_STATE = {
  comments: [],
  error: null
}

const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentsActionType.ADD_COMMENT:
      return {
        ...state, comments: [...state.comments, action.comments]
      }
    case CommentsActionType.DELETE_COMMENT:
      return {
        ...state, comments: state.comments.filter(comment => comment.id !== action.id)
      }
    default:
      return state;
  }
}

export default commentsReducer