import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'

class TaskNew extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      category: '',
      description: '',
      status: '',
      priority: '',
      user_id: JSON.parse(localStorage.getItem('token')).id,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...this.state }
    this.setState({
      title: '',
      category: '',
      description: '',
      status: '',
      priority: '',
      user_id: JSON.parse(localStorage.getItem('token')).id,
    });
    this.props.addTask(newTask)
  }

  render() {
    return (
      <>
        <Form id="new-task-form">
        <h1 className="newTaskFormHeading">Create a New Task</h1>
        <br></br>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <input name="title" type="text" placeholder="Title" onChange={e => this.handleChange(e)} value={this.title} className="new-task-non-enum-field"/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Category: </Form.Label>
            <select type="select" className="new-task-enum-field">
              <option value={0}>Bugs</option>
              <option value={1}>New Feature</option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Status: </Form.Label>
            <select type="select" className="new-task-enum-field">
              <option value={0}>To Do</option>
              <option value={1}>In Progress</option>
              <option value={2}>Finished</option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority: </Form.Label>
            <select type="select" className="new-task-enum-field">
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <input name="description" type="text" placeholder="Description" onChange={e => this.handleChange(e)} value={this.description} className="new-task-non-enum-field" />
          </Form.Group>

          <Button variant="primary" type="submit" className="formSubmit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default TaskNew