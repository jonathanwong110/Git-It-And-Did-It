import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions.js'
import { editTask, getSpecificTask } from '../../redux/Tasks/actions.js'
import { loadUsers } from '../../redux/Users/actions.js'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class TaskEdit extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      category: '',
      status: '',
      priority: '',
      assignee: '',
      description: '',
    }
  }

  componentDidMount() {
    this.props.setCurrentUser()
    this.props.loadUsers()
    let { match } = this.props
    let taskId = match.params.id
    this.props.getSpecificTask(taskId)
  }

  componentDidUpdate(prevProps) {
    let { specificTask } = this.props
    if (prevProps.specificTask !== specificTask) {
      this.setState(specificTask)
    }
    if (specificTask.user === undefined) {
      return <div> No Task to be edited</div>
    }
    if (Number(specificTask.user_id) !== Number(this.props.currentUser.id)) {
      this.props.history.push(`/tasks/${specificTask.id}`)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    })
  }

  handleStatusChange = (e) => {
    this.setState({
      status: e.target.value
    })
  }

  handlePriorityChange = (e) => {
    this.setState({
      priority: e.target.value
    })
  }

  handleAssigneeChange = (e) => {
    this.setState({
      assignee: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...this.state }
    this.setState({
      title: '',
      category: '',
      status: '',
      priority: '',
      assignee: '',
      description: '',
    });
    this.props.editTask(updatedTask, this.props.history)
  }

  render() {
    const { users, specificTask, errors } = this.props

    if (specificTask.id === undefined) {
      return <div>No Task Here</div>
    }

    return (
      <>
        <Form id="new-task-form" onSubmit={e => this.handleSubmit(e)}>
          <h1 className="newTaskFormHeading">Edit Task</h1>
          {Object.keys(errors).map((keyName, i) => (
            <div key={i}>
              <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
            </div>
          ))}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <input name="title" type="text" placeholder="Title" onChange={e => this.handleChange(e)} value={this.state.title} className="form-input-field" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category: </Form.Label>
            <select type="select" onChange={e => this.handleCategoryChange(e)} className="form-input-field" value={this.state.category}>
              <option value="bugs"> Bugs </option>
              <option value="new_features"> New Feature </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Status: </Form.Label>
            <select type="select" onChange={e => this.handleStatusChange(e)} className="form-input-field" value={this.state.status}>
              <option value="to_do"> To Do </option>
              <option value="in_progress"> In Progress </option>
              <option value="finished"> Finished </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority: </Form.Label>
            <select type="select" onChange={e => this.handlePriorityChange(e)} className="form-input-field" value={this.state.priority}>
              <option value="low"> Low </option>
              <option value="medium"> Medium </option>
              <option value="high"> High </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assignee: </Form.Label>
            <select type="select" className="form-input-field" onChange={e => this.handleAssigneeChange(e)} value={this.state.assignee} >
              {users.map(user => {
                return <option key={user.id} value={user.username}>{user.username}</option>
              })}
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <input name="description" type="text" placeholder="Description" onChange={e => this.handleChange(e)} value={this.state.description} className="form-input-field" />
          </Form.Group>

          <Button variant="primary" type="submit" className="formSubmit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.auth.currentUser,
    specificTask: state.tasks.specificTask,
    errors: state.tasks.errors
  }
}

export default compose(withRouter, connect(mapStateToProps, { setCurrentUser, editTask, loadUsers, getSpecificTask, capitalizeFirstLetter }))(TaskEdit)