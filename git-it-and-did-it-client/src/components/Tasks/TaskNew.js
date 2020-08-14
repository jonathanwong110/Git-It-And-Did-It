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
        <h1 className="newTaskFormHeading">Create a New Task</h1>
        <br></br>
        <Form id="new-task-form">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category: </Form.Label>
            <br></br>
            <select type="select" id="new-task-enum-field">
              <option value={0}>Bugs</option>
              <option value={1}>New Feature</option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status: </Form.Label>
            <br></br>
            <select type="select" id="new-task-enum-field">
              <option value={0}>To Do</option>
              <option value={1}>In Progress</option>
              <option value={2}>Finished</option>
            </select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority: </Form.Label>
            <br></br>
            <select type="select" id="new-task-enum-field">
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </>
    );
  }
}

export default TaskNew