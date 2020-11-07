import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { Nav, Navbar, CardDeck, Container, Row, Form, FormControl, Button } from 'react-bootstrap'
import UserDisplay from './UserDisplay'

class Users extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {

    const { users, match } = this.props

    return (
      <>
        <Navbar id="task-navbar">
          <Navbar.Brand href="#home">User Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <CardDeck>
          <Container>
            <Row className="userRow">
              {users.map(user => {
                return (
                  <UserDisplay key={user.id} user={user} match={match} />
                )
              })}
            </Row>
          </Container>
        </CardDeck>
      </>
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