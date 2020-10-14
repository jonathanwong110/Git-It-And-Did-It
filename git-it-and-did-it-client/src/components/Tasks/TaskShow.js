import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions'
import { loadTasks, deleteTask, getSpecificTask } from '../../redux/Tasks/actions'
import { getTaskComments, deleteComment } from '../../redux/Comments/actions'
import CommentNew from '../../components/Comments/CommentNew'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger, changeDateFormat, changeTimeFormat } from '../../appearance/appearanceFunctions'

class TaskShow extends Component {

  componentDidMount() {
    let { match } = this.props
    let taskId = match.params.id
    this.props.getSpecificTask(taskId)
    this.props.getTaskComments(taskId)
  }

  componentDidUpdate(prevProps) {
    let { match } = this.props
    let taskId = match.params.id
    if (prevProps.specificTask.length) {
      this.props.getSpecificTask(taskId)
      this.props.getTaskComments(taskId)
    }
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.props.currentTask.id, this.props.history)
  }

  render() {
    let { match, deleteComment, specificTask, currentUser } = this.props

    if (match.url.slice(7) === "new") {
      this.props.history.push('/tasks/new')
    }

    if (specificTask.length === undefined) {
      console.log(specificTask)
      return <div id="testing">There are no tasks here</div>
    }

    return (
      // <div>{console.log(specificTask)}</div>
      <div className="individual-task">
        <p className="task-title">
          {capitalizeFirstLetter(specificTask.title)}
        </p>
        {currentUser.id === specificTask.user_id ?
          <Button className="task-options-button"><Link to={`/tasks/${specificTask.id}/edit`} className="task-options">Edit</Link></Button> : null}
        {currentUser.id === specificTask.user_id ?
          <Button onClick={this.deletespecificTask} className="task-options">Delete</Button> : null}
        <div className="task-details-section">
          <p className="task-details-heading"> Details </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Category: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {categoryNameChanger(specificTask.category)}
            </p>
            <p className="task-traits"> Priority: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {capitalizeFirstLetter(specificTask.priority)}
            </p>
            <p className="task-traits"> Status: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {statusNameChanger(specificTask.status)}
            </p>
          </div>
        </div>
        <br></br>
        <div className="task-people-section">
          <p className="task-people-heading"> People </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Reporter: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {specificTask.user.username}
            </p>
            <p className="task-traits"> Assignee: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {specificTask.assignee}
            </p>
          </div>
        </div>
        <br></br>
        <div className="task-description-section">
          <p className="task-description-heading"> Description </p>
          <div className="task-description-details">
            <p className="task-traits">
              {capitalizeFirstLetter(specificTask.description)}
            </p>
          </div>
        </div>
        <div className="task-dates-section">
          <p className="task-date-heading"> Dates </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Created: </p>
            <p className="task-traits">
              {changeDateFormat(specificTask.created_at) + ' ' + changeTimeFormat(specificTask.created_at)}
            </p>
            <p className="task-traits"> Updated: </p>
            <p className="task-traits">
              {changeDateFormat(specificTask.updated_at) + ' ' + changeTimeFormat(specificTask.updated_at)}
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        <p className="task-comment-heading">Comments</p>
        <CommentNew task={specificTask} />
        <div className="task-comments-section">
          {this.props.comments.map(comment => {
            return (
              <div key={comment.id}>
                <div key={comment.id} className="task-individual-comment">
                  <p className="task-comment-header-section">
                    {comment.username}
                  </p>
                  <p className="task-comment-header-section">
                    {changeDateFormat(comment.created_at)}
                  </p>
                  <p className="task-comment-header-section">
                    {changeTimeFormat(comment.created_at)}
                  </p>
                  {JSON.parse(localStorage.getItem('token')).id === specificTask.user_id || JSON.parse(localStorage.getItem('token')).id === comment.user_id ? <Button variant="primary" className="task-comment-header-section" id="task-comment-delete-button" onClick={() => deleteComment(comment.id)}>X</Button> : null}
                </div>
                <div> {comment.content} </div>
                <br></br>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    specificTask: state.tasks.specificTask,
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, { loadTasks, setCurrentUser, deleteTask, deleteComment, getSpecificTask, getTaskComments, capitalizeFirstLetter, categoryNameChanger, statusNameChanger, changeDateFormat, changeTimeFormat })(TaskShow)