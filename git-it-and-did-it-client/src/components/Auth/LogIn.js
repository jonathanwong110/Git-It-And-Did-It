import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInStart } from '../../redux/Auth/actions'
import { Button } from 'react-bootstrap'

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
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <p>
          Username
        </p>
        <input id="username" name="username" type="text" onChange={e => this.handleChange(e)} value={this.username} />
        <p>
          Password
        </p>
        <input id="password" name="password" type="password" onChange={e => this.handleChange(e)} value={this.password} />
        <br></br>
        <br></br>
        <Button variant="success" type="submit">
          Log In
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInStart: (newLogIn) => dispatch(logInStart(newLogIn))
  }
}

export default connect(null, mapDispatchToProps)(LogInForm)