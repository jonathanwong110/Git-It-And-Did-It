import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions'
import { getSpecificUser } from '../../redux/Users/actions'
import { getUserTasks, loadTasks, getAssignedTasks } from '../../redux/Tasks/actions'
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

class Dashboard extends Component {

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('token'))
    let currentUserId = currentUser.id
    let currentUserName = currentUser.username
    this.props.getSpecificUser(currentUserId)
    this.props.getUserTasks(currentUserId)
    this.props.getAssignedTasks(currentUserName)
  }

  componentDidUpdate(prevProps) {
    let currentUser = JSON.parse(localStorage.getItem('token'))
    if (currentUser.email !== this.props.currentUser.email || currentUser.profile_icon !== this.props.currentUser.profile_icon) {
      this.props.setCurrentUser()
    }
  }

  render() {

    let { currentUser, tasks, assignedTasks } = this.props

    return (
      <div>
        <Image src={currentUser.profile_icon} id="specificUserProfileIcon" />
        <br></br>
        <p className="specificUserProfileEdit"><Link to={`users/${currentUser.id}/edit`} className="specificUserProfileEdit">
          Edit Profile
        </Link></p>
        <h1 className="specificUserUsername">{currentUser.username}</h1>
        <br></br>
        <h5 className="specificUserEmail">{currentUser.email}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row style={{ marginLeft: "20%" }}>
              {tasks.length === 0 ? <div>This user has not reported any tasks yet </div> : tasks.map(task => {
                return (
                  <Card style={{ width: '13rem', marginBottom: '30px' }} key={task.id} className="card-display">
                    <Card.Body key={task.id}>
                      <Card.Title className="cardTitle">
                        {capitalizeFirstLetter(task.title)}
                      </Card.Title>
                      <Card.Text>
                        {categoryNameChanger(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {statusNameChanger(task.status)}
                      </Card.Text>
                      <Card.Text>
                        Reporter: {task.user.username}
                      </Card.Text>
                      <Card.Text>
                        Assignee: {capitalizeFirstLetter(task.assignee)}
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
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Assigned</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row style={{ marginLeft: "20%" }}>
              {assignedTasks.length === 0 ? <div>This user has not been assigned tasks yet </div> : assignedTasks.map(task => {
                return (
                  <Card style={{ width: '13rem', marginBottom: '30px' }} key={task.id} className="card-display">
                    <Card.Body key={task.id}>
                      <Card.Title className="cardTitle">
                        {capitalizeFirstLetter(task.title)}
                      </Card.Title>
                      <Card.Text>
                        {categoryNameChanger(task.category)}
                      </Card.Text>
                      <Card.Text>
                        {capitalizeFirstLetter(task.priority)}
                      </Card.Text>
                      <Card.Text>
                        {statusNameChanger(task.status)}
                      </Card.Text>
                      <Card.Text>
                        Reporter: {task.user.username}
                      </Card.Text>
                      <Card.Text>
                        Assignee: {capitalizeFirstLetter(task.assignee)}
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
        <br></br>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks
  }
}

export default connect(mapStateToProps, { setCurrentUser, getSpecificUser, getUserTasks, getAssignedTasks, loadTasks, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(Dashboard)