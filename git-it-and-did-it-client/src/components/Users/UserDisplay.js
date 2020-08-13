import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UserShow(props) {

  const { user } = props

  return (
    <Card style={{ width: '13rem', margin: '20px' }} className="userCardDisplay">
      <Card.Body className="cardBodyDisplay">
        <Card.Title id="cardTitle">{user.username}</Card.Title>
        <Card.Text>
          {user.email}
        </Card.Text>
        <Button variant="primary">
          <Link to={`/users/${user.id}`} className="more-details">
            Profile
            </Link>
        </Button>
        <br></br>
        <br></br>
      </Card.Body>
    </Card>
  )
}