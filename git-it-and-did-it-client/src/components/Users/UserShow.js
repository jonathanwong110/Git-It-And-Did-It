import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Row, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class UserShow extends Component {

  componentDidMount() {
    this.props.loadUsers()
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  categoryNameChanger = (category) => {
    if (category === "bugs") {
      return "Bugs"
    } else {
      return "New Features"
    }
  }

  statusNameChanger = (status) => {
    if (status === "to_do") {
      return "To Do"
    } else if (status === "in_progress") {
      return "In Progress"
    } else {
      return "Finished"
    }
  }

  render() {
    const { users, match } = this.props
    const individualUserId = (match.url.slice(-1)[0] - 1)
    const specificUser = users[individualUserId]

    if (users.length === 0) {
      return <div>There are no tasks</div>
    }

    return (
      <div>
        <h1 className="usernameShow">{specificUser["username"]}</h1>
        <br></br>
        <h5 className="usernameEmail">{specificUser["email"]}</h5>
        <br></br>
        <br></br>
        <h2 class="user-section">Tasks Reported</h2>
        <br></br>
        <br></br>
        <CardDeck>
          <Container>
            <Row id="task-row">
              {specificUser["tasks"].map(task => {
                return (
                  <Card style={{ width: '13rem' }} key={task.id} id="cardDisplay">
                    <Card.Body key={task.id} id="cardBodyDisplay">
                      <Card.Title id="cardTitle">
                        {this.capitalizeFirstLetter(task.title)}
                      </Card.Title>
                      <Card.Text>
                        {specificUser["username"]}
                      </Card.Text>
                      <Card.Text>
                        {this.categoryNameChanger(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {this.capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {this.statusNameChanger(task.status)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(loadUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)