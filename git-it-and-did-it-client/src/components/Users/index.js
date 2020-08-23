import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Row } from 'react-bootstrap'
import UserShow from './UserDisplay'

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { users, match } = this.props
    return (
      <CardDeck>
        <Container>
          <Row id="user-row">
            {users.map(user => {
              return (
                <UserShow key={user.id} user={user} match={match}></UserShow>
              )
            })}
          </Row>
        </Container>
      </CardDeck>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    users: state.users.users
  }
}

export default connect(mapStateToProps, { loadUsers })(Users)