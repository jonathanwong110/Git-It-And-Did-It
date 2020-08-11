import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function TaskDisplay(props) {

  const { task } = props

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Card style={{ width: '13rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>
          {capitalizeFirstLetter(props.task.title)}
        </Card.Title>
        <Card.Text>
          {capitalizeFirstLetter(props.task.category)}
        </Card.Text>
        <Card.Text>
          {capitalizeFirstLetter(props.task.priority)}
        </Card.Text>
        <Card.Text>
          {capitalizeFirstLetter(props.task.status)}
        </Card.Text>
        <Button variant="primary"><Link to={`/tasks/${task.id}`} className="more-details">View Details</Link></Button>
      </Card.Body>
    </Card>
  )
}