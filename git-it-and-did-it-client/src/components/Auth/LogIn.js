import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInStart } from '../../redux/Auth/actions'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class LogInForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
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
    const newLogIn = { ...this.state }
    this.props.logInStart(newLogIn).then(_ => this.props.history.push('/dashboard'))
  }

  render() {

    const { errors } = this.props

    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} className="gidiForm">
        <h1 className="formHeading">Log In</h1>
        <br></br>
        {Object.keys(errors).map((keyName, i) => {
          return (
            <div key={i}>
              <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
            </div>
          )
        })}
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <br></br>
          <input name="username" type="text" placeholder="Username" onChange={e => this.handleChange(e)} value={this.state.username} className="formInputField" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <br></br>
          <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} value={this.state.password} className="formInputField"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.auth.errors
  }
}

export default connect(mapStateToProps, { logInStart, capitalizeFirstLetter })(LogInForm)