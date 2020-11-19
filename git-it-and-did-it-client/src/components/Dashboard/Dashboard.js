import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/Auth/actions'
import { getSpecificUser } from '../../redux/Users/actions'
import { getUserTasks, loadTasks, getAssignedTasks } from '../../redux/Tasks/actions'
import { CardDeck, Container, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { statusNameChanger } from '../../appearance/appearanceFunctions'
import TaskDisplay from '../Tasks/TaskDisplay'

class Dashboard extends Component {

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('token'))
    let currentUserId = currentUser.user.id
    let currentUserName = currentUser.user.username
    this.props.setCurrentUser()
    this.props.getSpecificUser(currentUserId)
    this.props.getUserTasks(currentUserId)
    this.props.getAssignedTasks(currentUserName)
  }

  render() {

    let { currentUser, tasks, assignedTasks, match } = this.props

    return (
      <div>
        <div className="profileSectionWrapper">
          <Image src={currentUser.user?.profile_icon} alt="profile picture" id="specificUserProfileIcon" />
          <br></br>
          <div className="specificUserProfileEdit">
            <Link to={`users/${currentUser.user?.id}/edit`} className="specificUserProfileEditLink">
              Edit Profile
            </Link>
          </div>
          <br></br>
          <h1 className="specificUserUsername">{currentUser.user?.username}</h1>
          <br></br>
          <h5 className="specificUserEmail">{currentUser.user?.email}</h5>
          <br></br>
          <h2 className="taskSection">Tasks Reported</h2>
          <br></br>
        </div>
        <CardDeck>
          <Container>
            <Row className="taskRow">
              {tasks.length === 0 ?
                <div className="emptySection">This user has not reported any tasks yet </div> :
                tasks.map(task => {
                  return (
                    <TaskDisplay key={task.id} task={task} match={match} />
                  )
                })
              }
            </Row>
          </Container>
        </CardDeck>
        <div className="profileSectionWrapper">
          <br></br>
          <br></br>
          <h2 className="taskSection">Tasks Assigned</h2>
          <br></br>
        </div>
        <CardDeck>
          <Container>
            <Row className="taskRow">
              {assignedTasks.length === 0 ?
                <div className="emptySection">This user has not been assigned tasks yet </div> :
                assignedTasks.map(task => {
                  return (
                    <TaskDisplay key={task.id} task={task} match={match} />
                  )
                })
              }
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

export default connect(mapStateToProps, { setCurrentUser, getSpecificUser, getUserTasks, getAssignedTasks, loadTasks, statusNameChanger })(Dashboard)