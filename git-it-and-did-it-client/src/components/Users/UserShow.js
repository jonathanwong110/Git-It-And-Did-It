import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/Users/actions'
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
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
    const individualUserId = parseInt((match.url.slice(7)))
    const specificUser = users[individualUserId-1]
    const currentUser = JSON.parse(localStorage.getItem('token'))

    if (users.length === 0) {
      return <div>There are no tasks</div>
    }

    if (currentUser.id === individualUserId) {
      return this.props.history.push('/dashboard')
    }

    return (
      <div>
        <Image src={specificUser["profile_icon"]} id="specificUserProfileIcon" />
        <br></br>
        <h1 className="specificUserUsername">{specificUser["username"]}</h1>
        <br></br>
        <h5 className="specificUserEmail">{specificUser["email"]}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
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
                        {this.categoryNameChanger(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {this.capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {this.statusNameChanger(task.status)}
                      </Card.Text>
                      <Card.Text>
                        Reporter: {specificUser["username"]}
                      </Card.Text>
                      <Card.Text>
                        Assignee: {this.capitalizeFirstLetter(task.assignee)}
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