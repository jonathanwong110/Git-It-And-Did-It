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
    this.props.signUp(newUser)
  }


  render() {

    const { errors } = this.props

    if (localStorage.getItem('token')) {
      return <Redirect to="/dashboard" />
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)} className="gidiForm">
        <h1 className="formHeading">Sign Up</h1>
        <br></br>
        {Object.keys(errors).map((keyName, i) => {
          return (
            <div key={i}>
              <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
            </div>
          )
        })}
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <br></br>
          <input name="email" type="text" placeholder="Email" onChange={e => this.handleChange(e)} value={this.state.email} className="formInputField" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile Icon: </Form.Label>
          <br></br>
          <input name="profile_icon" type="text" placeholder="Profile Icon" onChange={e => this.handleChange(e)} value={this.state.profile_icon} className="formInputField" />
        </Form.Group>
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

export default connect(mapStateToProps, { signUp, logInStart })(SignUpForm)