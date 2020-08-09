import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 100%;
    padding: 0.3rem;
    padding-left: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    transition: 0.2s all ease-in-out;
    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`

const Title = styled.h1`
    font-size: 20px;
    color: white;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
`

const MenuLink = ({ title, active, icon }) => {

    return (
        <Container active={active}>
            <Title active={active}>{icon} {title}</Title>
        </Container>
    )
}

export default MenuLink