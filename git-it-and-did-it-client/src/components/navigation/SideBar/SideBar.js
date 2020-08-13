import React from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 6%;
  bottom: 0;
  background-color: #618685;
  width: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SideBar = () => {
  return (
    <Container id="sidebar">
      <Menu />
    </Container>
  )
}

export default SideBar