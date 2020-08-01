import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class MainNav extends Component {

  render() {

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
              <Link to="/login" className="span">Log In</Link>
              <Link to="/signup" className="span">
                Sign Up
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}

export default MainNav;