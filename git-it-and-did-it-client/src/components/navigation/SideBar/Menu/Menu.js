import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faCog, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    margin-top: 1rem;
    width: 100%;
`

const Menu = () => {
  const homeIcon = <FontAwesomeIcon icon={faHome} />
  const boardIcon = <FontAwesomeIcon icon={faClipboard}/>
  const usersIcon = <FontAwesomeIcon icon={faUsers}/>
  const mailIcon = <FontAwesomeIcon icon={faEnvelope}/>
  const settingsIcon = <FontAwesomeIcon icon={faCog}/>
  return (
    <Container className="testing">
      <Link to="/dashboard"> <MenuLink title="Dashboard" icon={homeIcon}> </MenuLink> </Link>
      <Link to="/users"> <MenuLink title=" Users" icon={usersIcon}> </MenuLink> </Link>
      <Link to="/tasks"> <MenuLink title=" Tasks" icon={boardIcon}> </MenuLink> </Link>
      <Link to="/inbox"> <MenuLink title=" Inbox" icon={mailIcon}> </MenuLink> </Link>
      <Link to="/settings"> <MenuLink title=" Settings" icon={settingsIcon}> </MenuLink> </Link>
    </Container>
  )
}

export default Menu