import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { Nav, Navbar, CardDeck, Container, Row } from 'react-bootstrap'
import SearchUsers from './SearchUsers'
import UserDisplay from './UserDisplay'

class Users extends Component {

  constructor() {
    super();
    this.state = {
      searchEntry: '',
      searchQuery: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  handleChange = (e) => {
    this.setState({
      searchEntry: e.target.value,
      loading: true
    })
  }

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = this.state.searchEntry.toLowerCase()
    this.setState({
      searchQuery
    })
  }

  render() {

    const { searchEntry, searchQuery } = this.state
    let { users, match } = this.props

    if (searchQuery.length > 0) { users = users.filter(user => user.username.toLowerCase().includes(searchQuery)) }

    return (
      <>
        <Navbar className="secondaryNavbar">
          <Navbar.Brand className="navbarMainLink">User Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav.Item>
              <SearchUsers onKeyPress={this.onKeyPress} {...{ searchEntry, searchQuery }} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
        <CardDeck>
          <Container>
            <Row className="userRow">
              {users.length !== 0 ? users.map(user => {
                return (
                  <UserDisplay key={user.id} user={user} match={match} />
                )
              }) : <div className="emptyPage">No results found</div>}
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