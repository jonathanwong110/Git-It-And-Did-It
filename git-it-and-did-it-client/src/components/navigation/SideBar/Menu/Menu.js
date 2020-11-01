import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
`

const Menu = () => {

  const homeIcon = <FontAwesomeIcon icon={faHome} />
  const usersIcon = <FontAwesomeIcon icon={faUsers} />
  const boardIcon = <FontAwesomeIcon icon={faClipboard} id="taskIcon" />

  return (
    <Container className="sidebar-grid">
      <div className="sidebar-option">
        <Link to="/dashboard">
          <MenuLink title="Dashboard" icon={homeIcon} />
        </Link>
      </div>
      <div className="sidebar-option">
        <Link to="/users">
          <MenuLink title="Users" icon={usersIcon} />
        </Link>
      </div>
      <div className="sidebar-option">
        <div id="sidebarTasksCategory">
          <MenuLink icon={boardIcon} />
          <Navbar id="sidebar-menu-tasks">
            <Nav>
              <NavDropdown title="Tasks" id="sidebar-tasks-dropdown">
                <Link to="/tasks" className="menu-task-link">
                  View All Tasks
                </Link>
                <br></br>
                <Link to="/tasks/new" className="menu-task-link">
                  New Task
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar>
        </div>
      </div>
    </Container>
  )
}

export default Menu