import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'

class UserShow extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { users, match } = this.props
    const individualUser = (match.url.slice(-1)[0] - 1)
    return (
      <div>
        <h1>{users[individualUser]["username"]}</h1>
        {users[individualUser]["email"]} <br></br>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)