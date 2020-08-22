import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Dashboard extends Component {

  state = {"id":null,"created_at":"","updated_at":"","email":"JW@company.com","profile_icon":"","username":"","password":null,"tasks":[]}

  componentDidMount() {
    const currentUser = (JSON.parse(localStorage.getItem('token')))
    if (!currentUser) {
      return this.props.history.push('/login')
    } else {
      this.setState(currentUser)
    }
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
    let currentUser = this.state
    return (
      <div>
        <Image src={currentUser["profile_icon"]} id="specificUserProfileIcon" />
        <br></br>
        <p className="specificUserProfileEdit"><Link to='/settings' className="specificUserProfileEdit">
          Edit Profile
        </Link></p>
        <h1 className="specificUserUsername">{currentUser["username"]}</h1>
        <br></br>
        <h5 className="specificUserEmail">{currentUser["email"]}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row id="task-row">
              {currentUser["tasks"].map(task => {
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
                        Assignee: {this.capitalizeFirstLetter(task.assignee)}
                      </Card.Text>
                      <Card.Text>
                        Reporter: {currentUser["username"]}
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

export default connect(mapStateToProps)(Dashboard)