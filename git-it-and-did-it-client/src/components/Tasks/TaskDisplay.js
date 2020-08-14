import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function TaskDisplay(props) {

  const { task } = props

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function categoryNameChanger(category) {
    if (category === "bugs") {
      return "Bugs"
    } else {
      return "New Features"
    }
  }

  function statusNameChanger(status) {
    if (status === "to_do") {
      return "To Do"
    } else if (status === "in_progress") {
      return "In Progress"
    } else {
      return "Finished"
    }
  }

  return (
    <Card style={{ width: '13rem' }} id="cardDisplay">
      <Card.Body id="cardBodyDisplay">
        <Card.Title id="cardTitle">
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