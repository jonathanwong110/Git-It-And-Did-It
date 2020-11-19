import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutStart, setCurrentUser } from '../../redux/Auth/actions'

class MainNav extends Component {

  componentDidMount() {
    this.props.setCurrentUser()
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(this.props.currentUser)
    }
  }

  render() {

    const { currentUser } = this.props

    let profileIcon = currentUser ? currentUser.user?.profile_icon : null

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="main-nav" fixed="top">
          <Link to="/" className="navbar-left-side-main">GIDI</Link>
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            {currentUser.user?.id !== undefined ?
              <NavDropdown title={<Image src={profileIcon} alt="profile picture" width="40px" height="40px" />} id="lastMainNavItem">
                <Link to="/" onClick={this.props.logOutStart} id="logOutOption">Log Out</Link>
              </NavDropdown> :
              <Link to="/login" id="log-in-link">
                Log In
              </Link>}
            {currentUser.user?.id !== undefined ?
              null :
              <Link to="/signup" id="sign-up-link">
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

export default connect(mapStateToProps, { setCurrentUser, logOutStart })(MainNav);