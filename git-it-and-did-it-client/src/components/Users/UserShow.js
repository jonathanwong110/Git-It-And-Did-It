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
    let userId = Number(this.props.match.params.id)
    this.props.getSpecificUser(userId)
    let { specific_user } = this.props
    console.log(this.props)
    if (currentUserId === userId) {
      return this.props.history.push('/dashboard')
    }
    if (specific_user.length === 0) {
      this.props.getUserTasks(userId)
    } else {
      this.props.getUserTasks(userId)
      this.props.getTasksAssigned(specific_user.username)
    }
  }

  componentDidUpdate(prevProps) {
    let { match } = this.props
    let userId = Number(match.params.id)
    if (prevProps.specific_user === null && prevProps.specific_user.length) {
      this.props.getSpecificUser(userId)
      this.props.getUserTasks(userId)
    }
  }

  render() {

    let { specific_user, assigned_tasks } = this.props
    
    return (
      <div>
        <Image src={specific_user.profile_icon} id="specificUserProfileIcon" />
        <br></br>
        <h1 className="specificUserUsername">{specific_user.username}</h1>
        <br></br>
        <h5 className="specificUserEmail">{specific_user.email}</h5>
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
    specific_user: state.users.specific_user,
    tasks: state.tasks.tasks,
    assigned_tasks: state.tasks.assigned_tasks
  }
}

export default connect(mapStateToProps, { loadUsers, getSpecificUser, getUserTasks, getTasksAssigned, setCurrentUser, capitalizeFirstLetter, categoryNameChanger, statusNameChanger })(UserShow)