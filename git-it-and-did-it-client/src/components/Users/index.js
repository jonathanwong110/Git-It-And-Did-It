import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Row } from 'react-bootstrap'
import UserDisplay from './UserDisplay'

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {

    const { users, match } = this.props

    return (
      <CardDeck>
        <Container>
          <Row className="userRow">
            {users.map(user => {
              return (
                <UserDisplay key={user.id} user={user} match={match}/>
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