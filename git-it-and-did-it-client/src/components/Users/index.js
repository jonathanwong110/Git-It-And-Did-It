import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Col, Row } from 'react-bootstrap'
import UserShow from './UserDisplay'

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { users } = this.props
    return (
      <CardDeck>
        <Container>
          <Row>
            {users.map(user => {
              return (
                <Col key={user.id} xs="4" md="4">
                  <UserShow key={user.id} user={user}></UserShow>
                </Col>
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)