import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTasks } from '../redux/Tasks/actions'
import Tasks from '../components/Tasks/index'

class TaskContainer extends Component {

  constructor() {
    super()
    this.state = {
      filterBy: ''
    }
  }

  componentDidMount() {
    const { category } = this.props.match.params
    if (this.props.match.params.category !== undefined) {
      this.filterBy(category)
    } else {
      this.props.loadTasks()
    }
  }

  filterBy = category => {
    this.setState({
      filterBy: category === this.state.filterBy ? "" : category
    })
  }

  render() {
    return (
      <Tasks filterBy={this.state.filterBy} loadTasks={this.props.loadTasks} tasks={this.props.tasks} />
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
  }
}

export default connect(mapStateToProps, { loadTasks })(TaskContainer)