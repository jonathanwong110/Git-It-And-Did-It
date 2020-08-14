import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInStart } from '../../redux/Auth/actions'
import { Form, Button } from 'react-bootstrap'
import Dashboard from '../Dashboard/Dashboard'

class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newLogIn = { ...this.state }
    this.props.logInStart(newLogIn)
  }


  render() {
    const specificUser = (JSON.parse(localStorage.getItem('token')))

    if (specificUser) {
      return <Dashboard />
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} id="loginForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <br></br>
          <input name="username" type="text" placeholder="Username" onChange={e => this.handleChange(e)} value={this.username} id="loginInput" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <br></br>
          <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} value={this.state.price} id="loginInput"></input>
        </Form.Group>
        <Button variant="success" type="submit">
          Log In
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInStart: (newLogIn) => dispatch(logInStart(newLogIn))
  }
}

export default connect(null, mapDispatchToProps)(LogInForm)