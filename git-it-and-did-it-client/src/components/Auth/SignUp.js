import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp, logInStart } from '../../redux/Auth/actions'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class SignUpForm extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      profile_icon: '',
      username: '',
      password: ''
    };
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...this.state }
    this.props.signUp(newUser, this.props.history)
  }


  render() {

    const { errors } = this.props

    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} className="loginAndSignUpForm">
        <h1 className="newTaskFormHeading">Sign Up</h1>
        {Object.keys(errors).map((keyName, i) => (
          <div key={i}>
            <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
          </div>
        ))}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <br></br>
          <input name="email" type="text" placeholder="Email" onChange={e => this.handleChange(e)} value={this.email} className="form-input-field" />
        </Form.Group>
        <Form.Group controlId="formBasicProfileIcon">
          <Form.Label>Profile Icon: </Form.Label>
          <br></br>
          <input name="profile_icon" type="text" placeholder="Profile Icon" onChange={e => this.handleChange(e)} value={this.profile_icon} className="form-input-field" />
        </Form.Group>
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
          Sign Up
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

export default connect(mapStateToProps, { signUp, logInStart, capitalizeFirstLetter })(SignUpForm)