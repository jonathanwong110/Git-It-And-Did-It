import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers, getSpecificUser } from '../../redux/Users/actions'
import { getUserTasks, getTasksAssigned } from '../../redux/Tasks/actions'
import { setCurrentUser } from '../../redux/Auth/actions'
import { CardDeck, Container, Row, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter, categoryNameChanger, statusNameChanger } from '../../appearance/appearanceFunctions'

class UserShow extends Component {

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('token'))
    const currentUserId = currentUser.id
    let { users, match } = this.props
    let userId = Number(match.params.id)
    let specificUser = users[userId - 1]
    if (currentUserId === userId) {
      return this.props.history.push('/dashboard')
    }
    if (users.length === 0) {
      this.props.getSpecificUser(userId)
      this.props.getUserTasks(userId)
    } else {
      this.props.getSpecificUser(userId)
      this.props.getUserTasks(userId)
      this.props.getTasksAssigned(specificUser.username)
    }
  }

  // componentDidUpdate(prevProps) {
  //   let { match } = this.props
  //   let userId = match.params.id
  //   if (prevProps.currentUser === null && prevProps.users.length) {
  //     this.props.getUserTasks(userId)
  //   }
  // }

  render() {

    let { users, assigned_tasks } = this.props

    if (assigned_tasks === 0 ) {
      console.log('There are no assigned tasks')
    }

    return (
      <div>
        <Image src={users.profile_icon} id="specificUserProfileIcon" />
        <br></br>
        <h1 className="specificUserUsername">{users.username}</h1>
        <br></br>
        <h5 className="specificUserEmail">{users.email}</h5>
        <br></br>
        <br></br>
        <h2 className="user-section">Tasks Reported</h2>
        <br></br>
        <CardDeck>
          <Container>
            <Row style={{ marginLeft: "17.5%" }}>
              {this.props.tasks.map(task => {
                return (
                  <Card style={{ width: '13rem' }} key={task.id} id="cardDisplay">
                    <Card.Body key={task.id} id="cardBodyDisplay">
                      <Card.Title id="cardTitle">
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
            <Row style={{ marginLeft: "17.5%" }}>
              {assigned_tasks.map(task => {
                return (
                  <Card style={{ width: '13rem' }} key={task.id} id="cardDisplay">
                    <Card.Body key={task.id} id="cardBodyDisplay">
                      <Card.Title id="cardTitle">
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
    users: state.users.users,
    tasks: state.tasks.tasks,
    assigned_tasks: state.tasks.assigned_tasks
  }
}

export default connect(mapStateToProps, { loadUsers, getSpecificUser, getUserTasks, getTasksAssigned, setCurrentUser, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(UserShow)