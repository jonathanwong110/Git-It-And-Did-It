import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers, getSpecificUser } from '../../redux/Users/actions'
import { getUserTasks, getAssignedTasks } from '../../redux/Tasks/actions'
import { setCurrentUser } from '../../redux/Auth/actions'
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

class UserShow extends Component {

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('token'))
    const currentUserId = currentUser.id
    let userId = Number(this.props.match.params.id)
    this.props.getSpecificUser(userId)
    if (currentUserId === userId) {
      return this.props.history.push('/dashboard')
    }
    this.props.getUserTasks(userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.specificUser.username !== this.props.specificUser.username) {
      this.props.getAssignedTasks(this.props.specificUser.username)
    }
  }

  render() {

    let { specificUser, tasks, assignedTasks } = this.props

    return (
      <div>
        <Image src={specificUser.profile_icon} id="specificUserProfileIcon" />
        <br></br>
        <h1 className="specificUserUsername">{specificUser.username}</h1>
        <br></br>
        <h5 className="specificUserEmail">{specificUser.email}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <br></br>
        <CardDeck>
          <Container>
            <Row style={{ marginLeft: "17.5%" }}>
              {tasks.length === 0 ? <div>This user has not reported any tasks yet </div> : tasks.map(task => {
                return (
                  <Card style={{ width: '13rem', margin: '20px' }} key={task.id} className="card-display">
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
        <br></br>
        <CardDeck>
          <Container>
            <Row style={{ marginLeft: "17.5%" }}>
              {assignedTasks.length === 0 ? <div>This user has not been assigned tasks yet </div> : assignedTasks.map(task => {
                return (
                  <Card style={{ width: '13rem', margin: '20px' }} key={task.id} className="card-display">
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
    specificUser: state.users.specificUser,
    tasks: state.tasks.tasks,
    assignedTasks: state.tasks.assignedTasks
  }
}

export default connect(mapStateToProps, { loadUsers, getSpecificUser, getUserTasks, getAssignedTasks, setCurrentUser, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(UserShow)