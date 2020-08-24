import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks, deleteTask, setCurrentTask } from '../../redux/Tasks/actions'
import { getTaskComments, deleteComment } from '../../redux/Comments/actions'
import CommentNew from '../../components/Comments/CommentNew'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class TaskShow extends Component {

  componentDidMount() {
    if (this.props.tasks.length === 0) {
      this.props.loadTasks()
    } else {
      let { match } = this.props
      let taskId = match.params.id
      this.props.setCurrentTask(taskId)
      this.props.getTaskComments(taskId)
    }
  }

  componentWillReceiveProps(nextProps) {
    let { match } = this.props
    let taskId = match.params.id
    if (nextProps.currentTask === null && nextProps.tasks.length) {
      this.props.setCurrentTask(taskId)
      this.props.getTaskComments(taskId)
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  categoryNameChanger = (category) => {
    if (category === "bugs") {
      return "Bugs"
    } else {
      return "New Features"
    }
  }

  statusNameChanger = (status) => {
    if (status === "to_do") {
      return "To Do"
    } else if (status === "in_progress") {
      return "In Progress"
    } else {
      return "Finished"
    }
  }

  changeDateFormat = (str) => {
    return str.slice(5, 7) + '/' + str.slice(8, 10) + '/' + str.slice(2, 4)
  }

  changeTimeFormat = (str) => {
    let hoursOfTime = parseInt(str.slice(11, 13))
    let minutesOfTime = str.slice(14, 16)
    if (hoursOfTime > 12) {
      let newHoursOfTime = hoursOfTime - 12
      let finalHoursOfTime = newHoursOfTime.toString()
      let finalTime = finalHoursOfTime + ':' + minutesOfTime + 'PM'
      return finalTime
    } else {
      let hoursOfTime = parseInt(str.slice(12, 13))
      let finalHoursOfTime = hoursOfTime.toString()
      let finalTime = finalHoursOfTime + ':' + minutesOfTime + 'AM'
      return finalTime
    }
  }

  deleteCurrentTask = () => {
    this.props.deleteTask(this.props.currentTask.id)
  }

  render() {
    let { tasks, match, deleteComment, currentTask } = this.props
    const currentUser = JSON.parse(localStorage.getItem('token'))

    if (tasks.length === 0 || !currentTask) {
      return <div>There are no tasks</div>
    }

    if (match.url.slice(7) === "new") {
      this.props.history.push('/tasks/new')
    }

    return (
      <div className="individual-task">
        <p className="task-title">
          {this.capitalizeFirstLetter(currentTask["title"])}
        </p>
        {currentUser.id === currentTask.user_id ?
          <Button className="task-options-button"><Link to={`/tasks/${currentTask.id}/edit`} className="task-options">Edit</Link></Button> : null}
        {currentUser.id === currentTask.user_id ?
          <Button onClick={this.deleteCurrentTask} className="task-options">Delete</Button> : null}
        <div className="task-details-section">
          <p className="task-details-heading"> Details </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Category: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {this.categoryNameChanger(currentTask["category"])}
            </p>
            <p className="task-traits"> Priority: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {this.capitalizeFirstLetter(currentTask["priority"])}
            </p>
            <p className="task-traits"> Status: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {this.statusNameChanger(currentTask["status"])}
            </p>
          </div>
        </div>
        <br></br>
        <div className="task-people-section">
          <p className="task-people-heading"> People </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Reporter: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {currentTask["user"]["username"]}
            </p>
            <p className="task-traits"> Assignee: </p>
            <p className="task-traits" id="tasks-trait-second-col">
              {currentTask["assignee"]}
            </p>
          </div>
        </div>
        <br></br>
        <div className="task-description-section">
          <p className="task-description-heading"> Description </p>
          <div className="task-description-details">
            <p className="task-traits">
              {this.capitalizeFirstLetter(currentTask["description"])}
            </p>
          </div>
        </div>
        <div className="task-dates-section">
          <p className="task-date-heading"> Dates </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Created: </p>
            <p className="task-traits">
              {this.changeDateFormat(currentTask["created_at"]) + ' ' + this.changeTimeFormat(currentTask["created_at"])}
            </p>
            <p className="task-traits"> Updated: </p>
            <p className="task-traits">
              {this.changeDateFormat(currentTask["updated_at"]) + ' ' + this.changeTimeFormat(currentTask["updated_at"])}
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        <p className="task-comment-heading">Comments</p>
        <CommentNew task={currentTask} />
        <div className="task-comments-section">
          {this.props.comments.map(comment => {
            return (
              <div key={comment.id}>
                <div key={comment.id} className="task-individual-comment">
                  <p className="task-comment-header-section">
                    {comment.username}
                  </p>
                  <p className="task-comment-header-section">
                    {this.changeDateFormat(comment.created_at)}
                  </p>
                  <p className="task-comment-header-section">
                    {this.changeTimeFormat(comment.created_at)}
                  </p>
                  {JSON.parse(localStorage.getItem('token')).id === currentTask.user_id || JSON.parse(localStorage.getItem('token')).id === comment.user_id ? <Button variant="primary" className="task-comment-header-section" id="task-comment-delete-button" onClick={() => deleteComment(comment.id)}>X</Button> : null}
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
    tasks: state.tasks.tasks,
    currentTask: state.tasks.currentTask,
    comments: state.comments.comments
  }
}

export default connect(mapStateToProps, { loadTasks, deleteTask, deleteComment, setCurrentTask, getTaskComments })(TaskShow)