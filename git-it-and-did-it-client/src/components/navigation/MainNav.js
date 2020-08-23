import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutStart } from '../../redux/Auth/actions'

class MainNav extends Component {

  render() {

    let currentUser = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    let profileIcon = currentUser ? currentUser.profile_icon : null

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="main-nav" fixed="top">
          <Link to="/" className="navbar-left-side-main">GIDI</Link>
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            {JSON.parse(localStorage.getItem('token')) !== null ?
              <NavDropdown title={<Image src={profileIcon} alt={null} width="40px" height="40px"/>} id="basic-nav-dropdown" className="span" id="lastMainNavItem">
                <Link to="/" onClick={this.props.logOutStart} id="logoutoption">Log Out</Link>
              </NavDropdown> :
              <Link to="/login" className="span">Log In</Link>}
            {JSON.parse(localStorage.getItem('token')) ?
              null :
              <Link to="/signup" className="span">
                Sign Up
              </Link>}
          </Nav>
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

export default connect(mapStateToProps, { logOutStart })(MainNav);