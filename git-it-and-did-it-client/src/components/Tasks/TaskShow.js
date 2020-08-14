import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'
import TaskNew from './TaskNew'

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
    return str.slice(5, 7) + '/' + str.slice (8, 10) + '/' + str.slice(2, 4)
  }

  changeTimeFormat = (str) => {
    let hoursOfTime = parseInt(str.slice(11, 13)) - 4
    console.log(hoursOfTime)
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

  render() {
    let { tasks, match } = this.props
    let individualTaskId = (match.url.slice(-1)[0] - 1)
    let specificTask = tasks[individualTaskId]

    if (tasks.length === 0) {
      return <div>There are no tasks</div>
    }

    if (match.url.slice(7) === "new") {
      return <TaskNew />
    }

    console.log(specificTask.created_at)

    return (
      <div className="individual-task">
        <p className="task-title">{this.capitalizeFirstLetter(specificTask["title"])}</p>
        <div className="task-details-wrapper">
          <br></br>
          <p className="task-traits-heading"> Details </p>
          <div className="task-traits-grid">
            <p className="task-trait"> Category: </p>
            <p className="task-trait"> {this.categoryNameChanger(specificTask["category"])}</p>
            <p className="task-trait"> Priority: </p>
            <p className="task-trait">{this.capitalizeFirstLetter(specificTask["priority"])}</p>
            <p className="task-trait"> Status: </p>
            <p className="task-trait"> {this.statusNameChanger(specificTask["status"])}</p>
          </div>
        </div>
        <br></br>
        <div className="task-people-wrapper">
          <p className="task-people-heading"> People </p>
          <p className="task-created-by"> Reporter: {specificTask["user"]["username"]}</p>
        </div>
        <br></br>
        <div className="task-description-wrapper">
          <br></br>
          <p className="task-description-heading"> Description </p>
          <div className="task-description-details">
            <p>{this.capitalizeFirstLetter(specificTask["description"])}</p>
          </div>
        </div>
        <div className="task-dates-wrapper">
          <br></br>
          <p className="task-date-heading"> Dates </p>
          <div className="task-date-details">
            <p>Created: {this.changeDateFormat(specificTask["created_at"])} {this.changeTimeFormat(specificTask["created_at"])}</p>
            <p>Updated: {this.changeDateFormat(specificTask["updated_at"])} {this.changeTimeFormat(specificTask["updated_at"])}</p>
          </div>
        </div>
        <br></br>
        <br></br>
        <p className="task-comment-heading">Comments</p>
        {specificTask["comments"].map(comment => {
          return (
            <div key={comment.id} className="task-comments">
              {comment.username} - {comment.content} - {this.changeDateFormat(comment.created_at)} at {this.changeTimeFormat(comment.created_at)}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    tasks: state.tasks.tasks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow)