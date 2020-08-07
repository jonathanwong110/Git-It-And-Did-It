import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MainNav extends Component {

  render() {
    const { currentUser } = this.props
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to="/" className="navbar-left-side-main">GIDI</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/dashboard" className="navbar-left-side">Dashboard</Link>
              <Link to="/tasks" className="navbar-left-side">Tasks</Link>
            </Nav>
            <Nav>
              {currentUser ?
                <Link to="/logout" className="span">Log Out</Link> :
                <Link to="/login" className="span">Log In</Link>}
              {currentUser ?
                null :
                <Link to="/signup" className="span">
                  Sign Up
                </Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(MainNav);