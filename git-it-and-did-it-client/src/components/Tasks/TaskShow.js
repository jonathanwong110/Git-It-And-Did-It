import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import { deleteComment } from '../../redux/Comments/actions'
import TaskNew from './TaskNew'
import CommentNew from '../../components/Comments/CommentNew'
import { Button } from 'react-bootstrap'

class TaskShow extends Component {

  componentDidMount() {
    this.props.loadTasks()
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

  setMostCurrentlySeenTask = () => {
    let { tasks, match} = this.props
    let individualTaskId = (match.url.slice(7)[0] - 1)
    let specificTask = tasks[individualTaskId]
    localStorage.setItem('setMostCurrentlySeenTask', JSON.stringify(specificTask))
  }

  render() {
    let { tasks, match, deleteComment } = this.props
    let individualTaskId = (match.url.slice(7)[0] - 1)
    let specificTask = tasks[individualTaskId]

    this.setMostCurrentlySeenTask()

    if (tasks.length === 0) {
      return <div>There are no tasks</div>
    }

    if (match.url.slice(7) === "new") {
      return <TaskNew />
    }

    return (
      <div className="individual-task">
        <div className="task-title-wrapper">
          <p className="task-title">{this.capitalizeFirstLetter(specificTask["title"])}</p>
        </div>
        <div className="task-details-section">
          <p className="task-details-heading"> Details </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Category: </p>
            <p className="task-traits" id="tasks-trait-second-col"> {this.categoryNameChanger(specificTask["category"])}</p>
            <p className="task-traits"> Priority: </p>
            <p className="task-traits" id="tasks-trait-second-col">{this.capitalizeFirstLetter(specificTask["priority"])}</p>
            <p className="task-traits"> Status: </p>
            <p className="task-traits" id="tasks-trait-second-col"> {this.statusNameChanger(specificTask["status"])}</p>
          </div>
        </div>
        <br></br>
        <div className="task-people-section">
          <p className="task-people-heading"> People </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Reporter: </p>
            <p className="task-traits" id="tasks-trait-second-col"> {specificTask["user"]["username"]} </p>
            <p className="task-traits"> Assignee: </p>
            <p className="task-traits" id="tasks-trait-second-col"> Testing </p>
          </div>
        </div>
        <br></br>
        <div className="task-description-section">
          <p className="task-description-heading"> Description </p>
          <div className="task-description-details">
            <p className="task-traits"> {this.capitalizeFirstLetter(specificTask["description"])}</p>
          </div>
        </div>
        <div className="task-dates-section">
          <p className="task-date-heading"> Dates </p>
          <div className="task-traits-grid">
            <p className="task-traits"> Created: </p>
            <p className="task-traits"> {this.changeDateFormat(specificTask["created_at"]) + ' ' + this.changeTimeFormat(specificTask["created_at"])}</p>
            <p className="task-traits"> Updated: </p>
            <p className="task-traits"> {this.changeDateFormat(specificTask["updated_at"]) + ' ' + this.changeTimeFormat(specificTask["updated_at"])}</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <p className="task-comment-heading">Comments</p>
        <CommentNew task={specificTask}/>
        <div className="task-comments-section">
          {specificTask["comments"].map(comment => {
            return (
              <div key={comment.id}>
                <div key={comment.id} className="task-individual-comment">
                  <p className="task-comment-header-section"> {comment.username} </p>
                  <p className="task-comment-header-section"> {this.changeDateFormat(comment.created_at)} </p>
                  <p className="task-comment-header-section"> {this.changeTimeFormat(comment.created_at)} </p>
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
    tasks: state.tasks.tasks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks()),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow)