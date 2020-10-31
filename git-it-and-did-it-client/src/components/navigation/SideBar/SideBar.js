import React from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 47px;
  bottom: 0;
  background-color: #618685;
  width: 12rem;
  display: flex;
  flex-direction: column;
`

const SideBar = () => {
  return (
    <Container id="sidebar">
      <Menu />
    </Container>
  )
}

export default SideBar