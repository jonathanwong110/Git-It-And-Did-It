import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions.js'
import { getSpecificUser, editUser } from '../../redux/Users/actions.js'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'
import { capitalizeFirstLetter } from '../../appearance/appearanceFunctions'

class UserEdit extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      profile_icon: '',
      password: '',
    }
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('token'))
    let currentUserId = Number(currentUser.user.id)
    this.props.setCurrentUser()
    let userId = this.props.match.params.id
    if (Number(userId) !== currentUserId) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser.user !== prevProps.currentUser.user) {
      this.setState(this.props.currentUser.user)
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
        <Form onSubmit={e => this.handleSubmit(e)} className="gidiForm">
          <h1 className="formHeading">Edit Account</h1>
          <br></br>
          {Object.keys(errors).map((keyName, i) => {
            return (
              <div key={i}>
                <span className="errorMessage" key={i}> {capitalizeFirstLetter(keyName)} {errors[keyName]}</span>
              </div>
            )
          })}
          <br></br>
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
            <Form.Label>Password: </Form.Label>
            <br></br>
            <input type="password" name="password" placeholder="Password" onChange={e => this.handleChange(e)} value={this.state.password} className="formInputField"/>
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

export default compose(withRouter, connect(mapStateToProps, { getSpecificUser, editUser, setCurrentUser }))(UserEdit)