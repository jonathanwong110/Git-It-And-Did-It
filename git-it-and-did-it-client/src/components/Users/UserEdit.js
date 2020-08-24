import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { loadUsers, editUser, setCurrentUser } from '../../redux/Users/actions.js'

class UserEdit extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      profile_icon: '',
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    this.props.loadUsers()
    let { match } = this.props
    let userId = match.params.id
    this.props.setCurrentUser(userId)
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(nextProps.currentUser)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...this.state }
    this.setState({
      email: '',
      profile_icon: '',
      username: '',
      password: '',
    })
    this.props.editUser(updatedUser).then(_ => this.props.history.push(`/dashboard`))
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
    users: state.users.users,
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, { loadUsers, editUser, setCurrentUser })(UserEdit)