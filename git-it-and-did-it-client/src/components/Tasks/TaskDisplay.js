import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

export default function TaskDisplay(props) {

  const { task } = props

  return (
    <Card style={{ width: '13rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>
          {capitalizeFirstLetter(props.task.title)}
        </Card.Title>
        <Card.Text>
          {categoryNameChanger(props.task.category)}
        </Card.Text>
        <Card.Text>
          {capitalizeFirstLetter(props.task.priority)}
        </Card.Text>
        <Card.Text>
          {statusNameChanger(props.task.status)}
        </Card.Text>
        <Card.Text>
          Reporter: {capitalizeFirstLetter(props.task.user.username)}
        </Card.Text>
        <Card.Text>
          Assignee: {capitalizeFirstLetter(props.task.assignee)}
        </Card.Text>
        <Button variant="primary">
          <Link to={`/tasks/${task.id}`} className="more-details">
            View Details
          </Link>
        </Button>
        <br></br>
        <br></br>
      </Card.Body>
    </Card>
  )
}