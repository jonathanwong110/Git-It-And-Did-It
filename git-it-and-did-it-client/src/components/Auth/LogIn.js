import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInStart } from '../../redux/Auth/actions'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

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
    this.props.logInStart(newLogIn).then(_ => this.props.history.push('/dashboard'))
  }

  render() {

    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" /> 
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} className="loginAndSignUpForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <br></br>
          <input name="username" type="text" placeholder="Username" onChange={e => this.handleChange(e)} value={this.username} className="form-input-field" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <br></br>
          <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} value={this.state.password} className="form-input-field"></input>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    );
  }
}

export default connect(null, {logInStart})(LogInForm)