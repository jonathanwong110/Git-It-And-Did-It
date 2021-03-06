import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { addTask } from '../../redux/Tasks/actions.js'
import { loadUsers } from '../../redux/Users/actions.js'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class TaskNew extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      category: "bugs",
      status: 'to_do',
      priority: 'low',
      assignee: "jw",
      description: '',
      user_id: JSON.parse(localStorage.getItem('token')).user.id,
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value
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
    const newTask = { ...this.state }
    this.props.addTask(newTask, this.props.history)
  }

  render() {

    const { users, errors } = this.props

    let sortedUsers = users.sort((a, b) => (a.username > b.username) ? 1 : -1)

    return (
      <>
        <Form onSubmit={e => this.handleSubmit(e)} className="gidiForm">
          <h1 className="formHeading">Report a New Task</h1>
          {Object.keys(errors).map((keyName, i) => {
            return (
              <div key={i}>
                <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
              </div>
            )
          })}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <input name="title" type="text" placeholder="Title" onChange={e => this.handleChange(e)} value={this.state.title} className="formInputField" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category: </Form.Label>
            <select type="select" onChange={e => this.handleCategoryChange(e)} className="formInputField" value={this.state.category}>
              <option value="bugs"> Bugs </option>
              <option value="new_features"> New Feature </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Status: </Form.Label>
            <select type="select" onChange={e => this.handleStatusChange(e)} className="formInputField" value={this.state.status}>
              <option value="to_do"> To Do </option>
              <option value="in_progress"> In Progress </option>
              <option value="finished"> Finished </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority: </Form.Label>
            <select type="select" onChange={e => this.handlePriorityChange(e)} className="formInputField" value={this.state.priority}>
              <option value="low"> Low </option>
              <option value="medium"> Medium </option>
              <option value="high"> High </option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assignee: </Form.Label>
            <select type="select" className="formInputField" onChange={e => this.handleAssigneeChange(e)} value={this.state.assignee} >
              {sortedUsers.map(user => {
                return <option key={user.id} value={user.username}>{user.username}</option>
              })}
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <textarea name="description" type="text" placeholder="Description" onChange={e => this.handleChange(e)} value={this.state.description} className="formInputField" />
          </Form.Group>

          <Button variant="primary" type="submit">
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
    errors: state.tasks.errors
  }
}

export default compose(withRouter, connect(mapStateToProps, { addTask, loadUsers }))(TaskNew)