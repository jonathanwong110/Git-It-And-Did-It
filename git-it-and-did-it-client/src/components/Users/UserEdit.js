import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'

class UserEdit extends Component {

  constructor() {
    super();
    this.state = {
      id: JSON.parse(localStorage.getItem('token')).id,
      email: JSON.parse(localStorage.getItem('token')).email,
      profile_icon: JSON.parse(localStorage.getItem('token')).profile_icon,
      username: JSON.parse(localStorage.getItem('token')).username,
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUserInformation = { ...this.state }
    this.setState({
      id: JSON.parse(localStorage.getItem('token')).id,
      email: JSON.parse(localStorage.getItem('token')).email,
      profile_icon: JSON.parse(localStorage.getItem('token')).profile_icon,
      username: JSON.parse(localStorage.getItem('token')).username,
      password: '',
    })
    this.props.editUser(newUserInformation)
  }
  render() {
    return (
      <>
        <h1 className="formHeading">Edit your Account</h1>
        <br></br>
        <Form onSubmit={e => this.handleSubmit(e)} id="editUserForm">
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Profile Icon: </Form.Label>
            <br></br>
            <input name="profile_icon" type="text" placeholder="Profile Icon" onChange={e => this.handleChange(e)} value={this.username} className="form-input-field" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <br></br>
            <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} value={this.state.password} className="form-input-field"></input>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </>
    )
  }
}

export default UserEdit