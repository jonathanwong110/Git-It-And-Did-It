import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Container, Row, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Dashboard extends Component {

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const specificUser = (JSON.parse(localStorage.getItem('token')))

    return (
      <div>
        <h1>{specificUser["username"]}</h1>
        {specificUser["email"]}
        <br></br>
        <br></br>
        <h2>Tasks Created</h2>
        <br></br>
        <br></br>
        <CardDeck>
          <Container>
          <Row id="task-row">
              {specificUser["tasks"].map(task => {
                return (
                  <Card style={{ width: '13rem'}} key={task.id} id="taskCardDisplay">
                    <Card.Body key={task.id} id="taskBodyDisplay">
                      <Card.Title id="task-title">
                        {this.capitalizeFirstLetter(task.title)}
                      </Card.Title>
                      <Card.Text>
                        {specificUser["username"]}
                      </Card.Text>
                      <Card.Text>
                        {this.capitalizeFirstLetter(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {this.capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {this.capitalizeFirstLetter(task.status)}
                      </Card.Text>
                      <Button variant="primary"><Link to={`/tasks/${task.id}`} className="more-details">View Details</Link></Button>
                    </Card.Body>
                  </Card>
                )
              })}
            </Row>
          </Container>
        </CardDeck>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    users: state.users.users
  }
}

export default connect(mapStateToProps)(Dashboard)