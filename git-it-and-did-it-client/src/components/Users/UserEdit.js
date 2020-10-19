import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions.js'
import { editUser } from '../../redux/Users/actions.js'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class UserEdit extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      profile_icon: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.setCurrentUser()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState(this.props.currentUser)
    }
    const userId = this.props.match.params.id
    if (Number(userId) !== Number(this.props.currentUser.id)) {
      this.props.history.push('/dashboard')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userToBeEdited = { ...this.state }
    this.props.editUser(userToBeEdited, this.props.history)
  }

  render() {

    const { errors } = this.props

    return (
      <>
        <Form onSubmit={e => this.handleSubmit(e)} id="editUserForm">
          <h1 className="formHeading">Edit your Account</h1>
          {Object.keys(errors).map((keyName, i) => (
            <div key={i}>
              <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
            </div>
          ))}
          <br></br>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email: </Form.Label>
            <br></br>
            <input name="email" type="text" placeholder="Email" onChange={e => this.handleChange(e)} value={this.state.email} className="form-input-field" />
          </Form.Group>
          <Form.Group controlId="formBasicProfileIcon">
            <Form.Label>Profile Icon: </Form.Label>
            <br></br>
            <input name="profile_icon" type="text" placeholder="Profile Icon" onChange={e => this.handleChange(e)} value={this.state.profile_icon} className="form-input-field" />
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    errors: state.users.errors,
  }
}

export default compose(withRouter, connect(mapStateToProps, { editUser, setCurrentUser, capitalizeFirstLetter }))(UserEdit)