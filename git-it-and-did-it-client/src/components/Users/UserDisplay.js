import React from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UserDisplay(props) {

  const { user } = props

  return (
    <Card style={{ width: '13rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>
          {user.username}
        </Card.Title>
        <Image src={user.profile_icon} alt="profile picture" id="profile-image" />
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