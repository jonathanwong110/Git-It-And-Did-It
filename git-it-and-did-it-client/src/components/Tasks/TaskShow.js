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

    return (
      <div>
        <h1>{this.capitalizeFirstLetter(specificTask["title"])}</h1>
        Category: {this.capitalizeFirstLetter(specificTask["category"])}
        <br></br>
        {this.capitalizeFirstLetter(specificTask["description"])}
        <br></br>
        {this.capitalizeFirstLetter(specificTask["status"])}
        <br></br>
        {this.capitalizeFirstLetter(specificTask["priority"])}
        <br></br>
        {specificTask["user"]["username"]}
        <br></br>
        <br></br>
        {specificTask["comments"].map(comment => {
          return (
            <div key={comment.id}>
              {comment.username} - {comment.content} - {comment.created_at.slice(5, 10)}-{comment.created_at.slice(0, 4)} at {comment.created_at.slice(11, 19)}
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