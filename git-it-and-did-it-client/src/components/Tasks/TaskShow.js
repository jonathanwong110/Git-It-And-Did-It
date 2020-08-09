import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function TaskShow(props) {

  const { task } = props

  return (
    <Card style={{ width: '13rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>
          {task.category}
        </Card.Text>
        <Card.Text>
          {task.priority}
        </Card.Text>
        <Card.Text>
          {task.status}
        </Card.Text>
        <Button variant="primary"><Link to={`/task/${task.id}`} className="testing">View Details</Link></Button>
      </Card.Body>
    </Card>
  )
}