import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/Tasks/actions'

class TaskShow extends Component {

  componentDidMount() {
    this.props.loadTasks()
  }

  render() {
    const { tasks, match } = this.props
    const individualTask = (match.url.slice(-1)[0] - 1)
    return (
      <div>
        <h1>{tasks[individualTask]["title"]}</h1>
        {tasks[individualTask]["category"]} <br></br>
        {tasks[individualTask]["description"]} <br></br>
        {tasks[individualTask]["status"]} <br></br>
        {tasks[individualTask]["priority"]} <br></br>
        {tasks[individualTask]["user"]["username"]}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    tasks: state.tasks.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTasks: () => dispatch(loadTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskShow)