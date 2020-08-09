import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UserShow(props) {

  const { user } = props

  return (
    <Card style={{ width: '13rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          {user.email}
        </Card.Text>
        <Button variant="primary"><Link to={`/user/${user.id}`} className="testing">Profile</Link></Button>
      </Card.Body>
    </Card>
  )
}