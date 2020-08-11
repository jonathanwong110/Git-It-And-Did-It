import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'

class TaskShow extends Component {

  componentDidMount() {
    this.props.loadTasks()
  }

  render() {
    const { tasks, match } = this.props
    const individualTaskId = (match.url.slice(-1)[0] - 1)
    const specificTask = tasks[individualTaskId]

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <div>
        <h1>{capitalizeFirstLetter(specificTask["title"])}</h1>
        Category: {capitalizeFirstLetter(specificTask["category"])}
        <br></br>
        {capitalizeFirstLetter(specificTask["description"])}
        <br></br>
        {capitalizeFirstLetter(specificTask["status"])}
        <br></br>
        {capitalizeFirstLetter(specificTask["priority"])}
        <br></br>
        {specificTask["user"]["username"]}
        <br></br>
        <br></br>
        {specificTask["comments"].map(comment => {
          return (
            <div key={comment.id}>
              {comment.content} - {comment.created_at.slice(5, 10)}-{comment.created_at.slice(0, 4)} at {comment.created_at.slice(11, 19)}
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
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow)