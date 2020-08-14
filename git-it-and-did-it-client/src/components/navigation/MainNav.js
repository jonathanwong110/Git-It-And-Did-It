import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutStart } from '../../redux/Auth/actions'

class MainNav extends Component {

  render() {
    // const { currentUser } = this.props
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="main-nav">
          <Link to="/" className="navbar-left-side-main">GIDI</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              {JSON.parse(localStorage.getItem('token')) != null ?
                <Link to="/" className="span" id="lastMainNavItem" onClick={this.props.logOutStart}>Log Out</Link> :
                <Link to="/login" className="span">Log In</Link>}
              {JSON.parse(localStorage.getItem('token')) ?
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
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutStart: () => dispatch(logOutStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);