import React from 'react'
import MenuLink from './MenuLink'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    margin-top: 1rem;
    width: 100%;
`

const Menu = () => {
  const homeIcon = <FontAwesomeIcon icon={faHome} />
  return (
    <Container>
      <Link to="/dashboard"> <MenuLink title="Dashboard" icon={homeIcon}> </MenuLink> </Link>
      <Link to="/tasks"> <MenuLink title="Tasks"> </MenuLink> </Link>
      <Link to="/inbox"> <MenuLink title="Inbox"> </MenuLink> </Link>
      <Link to="/settings"> <MenuLink title="Settings"> </MenuLink> </Link>
    </Container>
  )
}

export default Menu