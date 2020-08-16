import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons'
// import { faHome, faClipboard, faCog, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
`

const Menu = () => {
  const homeIcon = <FontAwesomeIcon icon={faHome} />
  // const boardIcon = <FontAwesomeIcon icon={faClipboard} />
  const usersIcon = <FontAwesomeIcon icon={faUsers} />
  const mailIcon = <FontAwesomeIcon icon={faEnvelope} />
  const settingsIcon = <FontAwesomeIcon icon={faCog} />

  let userId = JSON.parse(localStorage.getItem('token')).id

  return (
    <Container className="more-details">
      <Link to="/dashboard"> <MenuLink title="Dashboard" icon={homeIcon}></MenuLink> </Link>
      <Link to="/users"> <MenuLink title="Users" icon={usersIcon}> </MenuLink> </Link>
      {/* <Link to="/tasks"> <MenuLink title="Tasks" icon={boardIcon}> </MenuLink> </Link> */}
      <Navbar>
        <Nav>
          <NavDropdown title="Tasks" className="menu-link">
            <Link to="/tasks" className="menu-task-link">View All Tasks</Link><br></br>
            <Link to="/tasks/new" className="menu-task-link">New Task</Link>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Link to="/inbox"> <MenuLink title="Inbox" icon={mailIcon}> </MenuLink> </Link>
      {localStorage.getItem('token') !== null ?
        <Link to={`/users/${userId}/edit`}> <MenuLink title="Settings" icon={settingsIcon}> </MenuLink> </Link> :
        <Link to="/settings"> <MenuLink title="Settings" icon={settingsIcon}> </MenuLink> </Link> }
    </Container>
  )
}

export default Menu